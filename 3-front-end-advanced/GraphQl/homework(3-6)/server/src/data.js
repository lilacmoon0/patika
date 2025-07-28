import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = join(__dirname, "data.json");

// Load data once and export a shared reference
let data = JSON.parse(readFileSync(dataPath, "utf8"));

// Function to save data back to file (optional, for persistence)
export const saveData = () => {
  writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
};

// Export the shared data object
export { data };
