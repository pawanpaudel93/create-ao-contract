import { TITLE_TEXT } from "@/constants.js";
import { getUserPkgManager } from "./getUserPkgManager.js";
import chalk from "chalk";

export const renderTitle = () => {
  // resolves weird behavior where the ascii is offset
  const pkgManager = getUserPkgManager();
  if (pkgManager === "yarn" || pkgManager === "pnpm") {
    console.log("");
  }
  console.log(chalk.blue(TITLE_TEXT));
};
