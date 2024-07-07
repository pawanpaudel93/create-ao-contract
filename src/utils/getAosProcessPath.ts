import path from "path";
import envPaths from "env-paths";

export function getAosProcessPath() {
  const paths = envPaths("create-ao-contract");
  const aosProcessPath = path.join(paths.data, "aos-process");
  return aosProcessPath;
}
