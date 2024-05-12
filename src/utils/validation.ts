import validatePackageName from "validate-npm-package-name";
import { removeTrailingSlash } from "./removeTrailingSlash.js";

// Validate a string against allowed package.json names
export const validateAppName = (rawInput: string) => {
  const input = removeTrailingSlash(rawInput);
  const paths = input.split("/");

  // If the first part is a @, it's a scoped package
  const indexOfDelimiter = paths.findIndex((p) => p.startsWith("@"));

  let appName = paths[paths.length - 1];
  if (paths.findIndex((p) => p.startsWith("@")) !== -1) {
    appName = paths.slice(indexOfDelimiter).join("/");
  }

  const nameValidation = validatePackageName(appName ?? "");

  if (input === "." || nameValidation.validForNewPackages) {
    return;
  } else {
    const errors = [...(nameValidation.errors || []), ...(nameValidation.warnings || [])];
    return errors.join("\n");
  }
};

export const validateImportAlias = (input: string) => {
  if (input.startsWith(".") || input.startsWith("/")) {
    return "Import alias can't start with '.' or '/'";
  }
  return;
};
