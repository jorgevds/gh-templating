import { getMarkdownFilenames } from "../src/util/template-choices.mjs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const pathToModuleTemplatesFolder = __dirname;

export const TEMPLATES = getMarkdownFilenames(__dirname);
