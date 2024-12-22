/* eslint-disable no-undef */
import { glob } from "glob";
import { spawn } from "child_process";

// First find all Lua files
const luaFiles = glob.sync("src/**/*.lua");

// Only proceed if we found files to format
if (luaFiles.length === 0) {
  console.log("ℹ️  No Lua files found to format");
  process.exit(0);
}

// Pass the actual files to the formatter
const formatter = spawn("arweave", ["fmt", ...luaFiles], {
  stdio: ["inherit", "inherit", "pipe"],
  shell: true,
});

formatter.on("error", (err) => {
  console.error("❌ Failed to start formatter:", err.message);
  process.exit(1);
});

let hasError = false;

formatter.stderr?.on("data", (data) => {
  hasError = true;
  console.error(`❌ Formatter error: ${data}`);
});

// Modify exit handler to consider stderr output
formatter.on("exit", (code, signal) => {
  if (code === 0 && !hasError) {
    console.log("✅ Formatting completed successfully");
  } else {
    console.error(`❌ Formatter failed with ${signal ? `signal ${signal}` : `code ${code}`}`);
    process.exit(1);
  }
});

// Modify close handler to be more specific
formatter.on("close", (code, signal) => {
  if (code !== 0) {
    console.error(
      `⚠️  Formatter process closed unexpectedly ${signal ? `with signal ${signal}` : `with code ${code}`}`
    );
    process.exit(1);
  }
});
