import path from "path";
import { fileURLToPath } from "url";

export const PKG_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "../");
export const TITLE_TEXT = `      ___ ___ ___   _ _____ ___     _   ___     ___ ___  _  _ _____ ___    _   ___ _____
   /  __| _ \\ __|  /_\\_   _| __|   /_\\ / _ \\   / __/ _ \\| \\| |_   _| _ \\  /_\\ / __|_   _|
  |  (__|   / _|  / _ \\| | | _|   / _ \\ (_) | | (_| (_) | .\` | | | |   / / _ \\ (__  | |
   \\___ |_|_\\___|/_/ \\_\\_| |___| /_/ \\_\\___/   \\___\\___/|_|\\_| |_| |_|_\\/_/ \\_\\___| |_|
  `;
export const DEFAULT_APP_NAME = "my-ao-contract";
export const CLI_NAME = "create-ao-contract";
