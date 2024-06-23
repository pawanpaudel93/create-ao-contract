import path from "path";

import { scaffoldProject } from "@/helpers/scaffoldProject.js";
import { getUserPkgManager } from "@/utils/getUserPkgManager.js";

interface CreateProjectOptions {
  projectName: string;
  scopedAppName: string;
  noInstall: boolean;
}

export const createProject = async ({ projectName, scopedAppName, noInstall }: CreateProjectOptions) => {
  const pkgManager = getUserPkgManager();
  const projectDir = path.resolve(process.cwd(), projectName);

  // Bootstraps the base ao contract
  await scaffoldProject({
    projectName,
    projectDir,
    pkgManager,
    scopedAppName,
    noInstall,
  });

  return projectDir;
};
