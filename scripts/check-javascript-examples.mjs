import { execFile } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { createContext, Script } from "node:vm";

const runFile = promisify(execFile);
const projectRoot = path.resolve(import.meta.dirname, "..");
const exampleRoots = [
  path.join(projectRoot, "codes", "javascript"),
  path.join(projectRoot, "en", "codes", "javascript")
];
const correctnessProbes = [
  {
    file: "chapter_searching/binary_search.js",
    assertion: `
      assert(binarySearch([], 1) === -1, "closed search must handle an empty array");
      assert(binarySearch([1, 3, 6, 8], 6) === 2, "closed search returned the wrong index");
      assert(binarySearchLCRO([1, 3, 6, 8], 8) === 3, "left-closed search returned the wrong index");
      assert(binarySearchLCRO([1, 3, 6, 8], 2) === -1, "left-closed search found a missing value");
    `
  },
  {
    file: "chapter_searching/binary_search_insertion.js",
    assertion: `
      assert(binarySearchInsertionSimple([1, 3, 6], 0) === 0, "simple insertion missed the first position");
      assert(binarySearchInsertionSimple([1, 3, 6], 4) === 2, "simple insertion returned the wrong middle position");
      assert(binarySearchInsertion([1, 2, 2, 2, 4], 2) === 1, "duplicate insertion must return the left boundary");
      assert(binarySearchInsertion([1, 2, 2, 2, 4], 5) === 5, "duplicate insertion missed the final position");
    `
  },
  {
    file: "chapter_sorting/bubble_sort.js",
    assertion: `
      const __bubble = [4, 1, 3, 1, 5, 2];
      const __bubbleFlag = [...__bubble];
      bubbleSort(__bubble);
      bubbleSortWithFlag(__bubbleFlag);
      assert(JSON.stringify(__bubble) === "[1,1,2,3,4,5]", "bubble sort produced the wrong order");
      assert(JSON.stringify(__bubbleFlag) === JSON.stringify(__bubble), "optimized bubble sort diverged");
    `
  },
  {
    file: "chapter_sorting/counting_sort.js",
    assertion: `
      const __counting = [4, 0, 2, 2, 1, 0];
      const __countingNaive = [...__counting];
      countingSort(__counting);
      countingSortNaive(__countingNaive);
      assert(JSON.stringify(__counting) === "[0,0,1,2,2,4]", "counting sort produced the wrong order");
      assert(JSON.stringify(__countingNaive) === JSON.stringify(__counting), "naive counting sort diverged");
    `
  },
  {
    file: "chapter_sorting/quick_sort.js",
    assertion: `
      for (const __Sorter of [QuickSort, QuickSortMedian, QuickSortTailCall]) {
        const __quick = [5, 1, 4, 2, 8, 2];
        new __Sorter().quickSort(__quick, 0, __quick.length - 1);
        assert(JSON.stringify(__quick) === "[1,2,2,4,5,8]", __Sorter.name + " produced the wrong order");
      }
    `
  },
  {
    file: "chapter_dynamic_programming/climbing_stairs_dp.js",
    assertion: `
      assert(climbingStairsDP(1) === 1 && climbingStairsDP(2) === 2, "climbing-stairs base cases are wrong");
      assert(climbingStairsDP(5) === 8, "climbing-stairs DP returned the wrong result");
      assert(climbingStairsDPComp(9) === 55, "space-optimized climbing-stairs DP returned the wrong result");
    `
  },
  {
    file: "chapter_dynamic_programming/knapsack.js",
    assertion: `
      const __weights = [10, 20, 30];
      const __values = [60, 100, 120];
      assert(knapsackDP(__weights, __values, 50) === 220, "0-1 knapsack DP returned the wrong optimum");
      assert(knapsackDPComp(__weights, __values, 50) === 220, "optimized 0-1 knapsack DP returned the wrong optimum");
      assert(knapsackDFS(__weights, __values, __weights.length, 50) === 220, "0-1 knapsack DFS returned the wrong optimum");
    `
  },
  {
    file: "chapter_dynamic_programming/edit_distance.js",
    assertion: `
      assert(editDistanceDP("kitten", "sitting") === 3, "edit-distance DP returned the wrong result");
      assert(editDistanceDPComp("kitten", "sitting") === 3, "optimized edit-distance DP returned the wrong result");
      assert(editDistanceDFS("abc", "yabd", 3, 4) === 2, "edit-distance DFS returned the wrong result");
    `
  },
  {
    file: "chapter_backtracking/permutations_i.js",
    assertion: `
      const __permutations = permutationsI([1, 2, 3]);
      assert(__permutations.length === 6, "permutation search returned the wrong number of results");
      assert(new Set(__permutations.map((item) => item.join(","))).size === 6, "permutation search returned duplicates");
    `
  },
  {
    file: "chapter_greedy/fractional_knapsack.js",
    assertion: `
      assert(fractionalKnapsack([10, 20, 30], [60, 100, 120], 50) === 240, "fractional knapsack returned the wrong optimum");
      assert(fractionalKnapsack([10], [50], 4) === 20, "fractional knapsack returned the wrong partial value");
    `
  }
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

for (const root of exampleRoots) {
  for (const probe of correctnessProbes) {
    const file = path.join(root, probe.file);
    try {
      const source = await readFile(file, "utf8");
      const context = createContext({
        assert(condition, detail) {
          if (!condition) throw new Error(detail || "Correctness assertion failed");
        },
        console: { log() {} },
        exports: {},
        module: { exports: {} }
      });
      new Script(`${source}\n${probe.assertion}`, { filename: file })
        .runInContext(context, { timeout: 5_000 });
    } catch (error) {
      failures.push({
        file: path.relative(projectRoot, file).replaceAll("\\", "/"),
        detail: `correctness probe: ${error.message || "Unknown error"}`
      });
    }
  }
}

if (failures.length) {
  throw new Error(`JavaScript algorithm examples failed:\n${failures
    .map(({ file, detail }) => `- ${file}: ${detail}`)
    .join("\n")}`);
}

console.log(
  `JavaScript algorithm checks passed (${examples.length} runnable examples and ` +
  `${correctnessProbes.length * exampleRoots.length} correctness probes across both source trees).`
);
