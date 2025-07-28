import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const userSchema = readFileSync(join(__dirname, "User.graphql"), "utf8");
const messageSchema = readFileSync(join(__dirname, "Message.graphql"), "utf8");

export default [userSchema, messageSchema].join("\n");
