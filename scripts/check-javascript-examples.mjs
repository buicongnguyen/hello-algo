import { execFile } from "node:child_process";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const runFile = promisify(execFile);
const projectRoot = path.resolve(import.meta.dirname, "..");
const exampleRoots = [
  path.join(projectRoot, "codes", "javascript"),
  path.join(projectRoot, "en", "codes", "javascript")
];

async function collectExamples(root) {
  const directories = (await readdir(root, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("chapter_"))
    .map((entry) => entry.name)
    .sort();
  const files = [];
  for (const directory of directories) {
    const directoryPath = path.join(root, directory);
    const entries = await readdir(directoryPath, { withFileTypes: true });
    files.push(...entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".js"))
      .map((entry) => path.join(directoryPath, entry.name))
      .sort());
  }
  return files;
}

const exampleGroups = await Promise.all(exampleRoots.map(collectExamples));
const relativeExampleSets = exampleGroups.map((files, index) => files
  .map((file) => path.relative(exampleRoots[index], file).replaceAll("\\", "/"))
  .sort());
if (!relativeExampleSets[0].length || JSON.stringify(relativeExampleSets[0]) !== JSON.stringify(relativeExampleSets[1])) {
  throw new Error("Root and English JavaScript example trees do not contain the same runnable files");
}
const examples = exampleGroups.flat();
const failures = [];
let nextIndex = 0;

async function worker() {
  while (nextIndex < examples.length) {
    const file = examples[nextIndex];
    nextIndex += 1;
    try {
      await runFile(process.execPath, [file], {
        cwd: path.dirname(file),
        encoding: "utf8",
        maxBuffer: 1024 * 1024,
        timeout: 15_000,
        windowsHide: true
      });
    } catch (error) {
      failures.push({
        file: path.relative(projectRoot, file).replaceAll("\\", "/"),
        detail: (error.stderr || error.message || "Unknown error").trim()
      });
    }
  }
}

await Promise.all(Array.from({ length: Math.min(8, examples.length) }, worker));

if (failures.length) {
  throw new Error(`JavaScript algorithm examples failed:\n${failures
    .map(({ file, detail }) => `- ${file}: ${detail}`)
    .join("\n")}`);
}

console.log(`JavaScript algorithm checks passed (${examples.length} runnable examples across both source trees).`);
