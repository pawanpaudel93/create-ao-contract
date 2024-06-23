#!/usr/bin/env node

/**
 * This CLI integrates contributions and portions of code sourced from various repositories.
 * For a complete list of contributions and credits, please see https://github.com/pawanpaudel93/create-ao-contract/blob/main/CREDITS.md.
 */

import path from "path";
import { execa } from "execa";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";

import { logger } from "@/utils/logger.js";
import { runCli } from "@/cli/index.js";
import { getUserPkgManager } from "@/utils/getUserPkgManager.js";
import { renderTitle } from "@/utils/renderTitle.js";
import { parseNameAndPath } from "@/utils/parseNameAndPath.js";
import { createProject } from "@/helpers/createProject.js";
import { getVersion } from "@/utils/getCliVersion.js";
import { initializeGit } from "@/helpers/git.js";
import { installDependencies } from "@/helpers/installDependencies.js";
import { logNextSteps } from "@/helpers/logNextSteps.js";
import { getNpmVersion, renderVersionWarning } from "@/utils/renderVersionWarning.js";

type CPAPackageJSON = PackageJson & {
  caaMetadata?: {
    initVersion: string;
  };
};

const main = async () => {
  const npmVersion = await getNpmVersion();
  const pkgManager = getUserPkgManager();
  renderTitle();
  npmVersion && renderVersionWarning(npmVersion);

  const {
    appName,
    flags: { noGit, noInstall },
  } = await runCli();

  const [scopedAppName, appDir] = parseNameAndPath(appName);

  const projectDir = await createProject({
    projectName: appDir,
    scopedAppName,
    noInstall,
  });

  // Write name to package.json
  const pkgJson = fs.readJSONSync(path.join(projectDir, "package.json")) as CPAPackageJSON;
  pkgJson.name = scopedAppName;
  pkgJson.cacMetadata = { initVersion: getVersion() };

  // ? Bun doesn't support this field (yet)
  if (pkgManager !== "bun") {
    const { stdout } = await execa(pkgManager, ["-v"], {
      cwd: projectDir,
    });
    pkgJson.packageManager = `${pkgManager}@${stdout.trim()}`;
  }

  fs.writeJSONSync(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  });

  // Update aod.config.js
  let aodConfig = fs.readFileSync(path.join(projectDir, "aod.config.js"), "utf-8");
  aodConfig = aodConfig.replaceAll("my_ao_contract", `"${scopedAppName}"`).replaceAll("my-ao-contract", scopedAppName);
  fs.writeFileSync(path.join(projectDir, "aod.config.js"), aodConfig);

  // Update README.md
  let readmeContent = fs.readFileSync(path.join(projectDir, "README.md"), "utf-8");
  readmeContent = readmeContent.replaceAll("my-ao-contract", scopedAppName);
  if (pkgManager === "yarn" || pkgManager === "pnpm") {
    readmeContent = readmeContent.replaceAll("npm run", pkgManager)
  } else if (pkgManager === "bun") {
    readmeContent = readmeContent.replaceAll("npm", "bun")
  }
  fs.writeFileSync(path.join(projectDir, "README.md"), readmeContent);

  let showInstallCommand = noInstall;
  if (!noInstall) {
    showInstallCommand = await installDependencies({ projectDir });
  }

  if (!noGit) {
    await initializeGit(projectDir);
  }

  await logNextSteps({
    projectName: appDir,
    noInstall: showInstallCommand,
    projectDir,
  });

  process.exit(0);
};

main().catch((err) => {
  logger.error("Aborting installation...");
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error(
      "Unexpected error. Please open an issue on github: https://github.com/pawanpaudel93/create-ao-contract with the error below:"
    );
    console.log(err);
  }
  process.exit(1);
});
