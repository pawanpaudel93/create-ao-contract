import * as p from "@clack/prompts";
import { Command } from "commander";
import chalk from "chalk";

import { CLI_NAME, DEFAULT_APP_NAME } from "@/constants.js";
import { getVersion } from "@/utils/getCliVersion.js";
import { getUserPkgManager } from "@/utils/getUserPkgManager.js";
import { validateAppName } from "@/utils/validation.js";

interface CliResults {
  appName: string;
  flags: {
    noGit: boolean;
    noInstall: boolean;
    default: boolean;
  };
}

const defaultOptions: CliResults = {
  appName: DEFAULT_APP_NAME,
  flags: {
    noGit: false,
    noInstall: false,
    default: false
  },
};

export const runCli = async (): Promise<CliResults> => {
  let cliResults: CliResults;
  try {
    cliResults = structuredClone(defaultOptions);
  } catch {
    cliResults = JSON.parse(JSON.stringify(defaultOptions));
  }

  const program = new Command()
    .name(CLI_NAME)
    .description("A CLI for creating full-stack Arweave web applications")
    .argument("[dir]", "The name of the application, as well as the name of the directory to create", (value) => {
      if (value !== defaultOptions.appName) {
        const nameValidation = validateAppName(value);
        if (nameValidation) {
          throw new Error(nameValidation);
        }
      }
      return value;
    })
    .usage(`${chalk.green("[dir]")} [options]`)
    .option(
      "--noGit",
      "Explicitely tell the CLI to not initialize a new git repo in the project",
      defaultOptions.flags.noGit
    )
    .option(
      "--noInstall",
      "Explicitely tell the CLI to not run the package manager's install command",
      defaultOptions.flags.noInstall
    )
    .option(
      "-y, --default",
      "Bypass the CLI and Use default options to bootstrap a new Arweave app. Note: Default options can be overridden by user-provided options.",
      defaultOptions.flags.default
    )
    .version(getVersion(), "-v, --version", "Display the version number")
    .parse(process.argv);

  const cliProvidedAppName = program.args[0];
  if (cliProvidedAppName) {
    cliResults.appName = cliProvidedAppName;
  }

  cliResults.flags = program.opts();

  if (cliResults.flags.default) {
    return cliResults;
  }

  const pkgManager = getUserPkgManager();

  const project = await p.group(
    {
      ...(!cliProvidedAppName && {
        name: () =>
          p.text({
            message: "What will your project be called?",
            defaultValue: defaultOptions.appName,
            placeholder: defaultOptions.appName,
            validate: validateAppName,
          }),
      }),
      ...(cliResults.flags.noGit === defaultOptions.flags.noGit && {
        git: () => {
          return p.confirm({
            message: "Should we initialize a Git repository and stage the changes?",
            initialValue: !defaultOptions.flags.noGit,
          });
        },
      }),
      ...(cliResults.flags.noInstall === defaultOptions.flags.noInstall && {
        install: () => {
          return p.confirm({
            message: `Should we run '${pkgManager}` + (pkgManager === "yarn" ? `'?` : ` install' for you?`),
            initialValue: !defaultOptions.flags.noInstall,
          });
        },
      })
    },
    {
      onCancel() {
        process.exit(1);
      },
    }
  );

  return {
    appName: project.name ?? cliResults.appName,
    flags: {
      ...cliResults.flags,
      noGit: !project.git ?? cliResults.flags.noGit,
      noInstall: !project.install ?? cliResults.flags.noInstall
    },
  };
};
