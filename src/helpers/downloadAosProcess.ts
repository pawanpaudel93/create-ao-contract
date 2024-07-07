import fetch from "node-fetch";
import AdmZip from "adm-zip";
import fs from "fs/promises";
import fse from "fs-extra";
import path from "path";
import { getAosProcessPath } from "@/utils/getAosProcessPath.js";

const zipUrl = "https://github.com/permaweb/aos/archive/refs/heads/main.zip";
const folderToCopy = "aos-main/process";
const maxRetries = 3;
const retryDelay = 2000; // 2 seconds

async function fetchWithRetry(url: string, retries: number, delay: number) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to download zip file: ${response.statusText}`);
      }
      return response;
    } catch (error: any) {
      if (attempt < retries) {
        console.warn(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw new Error(`Failed to download zip file after ${retries} attempts: ${error.message}`);
      }
    }
  }
  return;
}

async function folderExists(folderPath: string) {
  try {
    await fs.access(folderPath);
    return true;
  } catch (error) {
    return false;
  }
}

export async function downloadAosProcess(projectDir: string) {
  try {
    const destinationDir = getAosProcessPath();

    const isAosDownloaded = await folderExists(destinationDir);
    if (isAosDownloaded) return true;

    // Ensure the destination directory exists
    await fs.mkdir(destinationDir, { recursive: true });

    // Download the zip file with retries
    const response = await fetchWithRetry(zipUrl, maxRetries, retryDelay);
    if (!response) return false;

    const arrayBuffer = await response.arrayBuffer();
    const zip = new AdmZip(Buffer.from(arrayBuffer));
    const zipEntries = zip.getEntries();

    // Copy the specific folder to the destination directory
    for (const entry of zipEntries) {
      if (entry.entryName.startsWith(folderToCopy)) {
        const relativePath = entry.entryName.replace(folderToCopy, "");
        const filePath = path.join(destinationDir, relativePath);

        if (entry.isDirectory) {
          await fs.mkdir(filePath, { recursive: true });
        } else {
          await fs.writeFile(filePath, entry.getData());
        }
      }
    }

    // Copy everything inside testing Directory
    const testingDir = path.join(projectDir, "src", "libs", "testing");
    await fse.copy(testingDir, destinationDir);
    await fse.remove(testingDir);

    return true;
  } catch (error: any) {
    return false;
  }
}
