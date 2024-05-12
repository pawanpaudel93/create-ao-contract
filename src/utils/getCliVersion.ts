import fs from "fs-extra";
import path from "path";
import { type PackageJson } from "type-fest";

import { PKG_ROOT } from "@/constants.js";

export const getVersion = () => {
  const packageJsonPath = path.join(PKG_ROOT, "package.json");
  const packageJson = fs.readJSONSync(packageJsonPath) as PackageJson;
  return packageJson.version || "1.0.0";
};
