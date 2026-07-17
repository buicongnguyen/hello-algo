const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");

const savedTheme = localStorage.getItem("hello-algo-atlas-theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
root.dataset.theme = savedTheme || (prefersLight ? "light" : "dark");

const cssColor = (name) => getComputedStyle(root).getPropertyValue(name).trim();

themeToggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
  localStorage.setItem("hello-algo-atlas-theme", root.dataset.theme);
  drawRoadmap();
  drawTraversal();
  drawComplexity();
});

const topicData = {
  foundations: {
    number: "Node 01",
    status: "Best place to begin",
    title: "Foundations",
    summary: "Build the vocabulary for inputs, outputs, correctness, data structures, and the algorithm that transforms one into the other.",
    before: "Nothing — begin here",
    after: "Complexity · Arrays & lists",
    hook: "Data is the shape; an algorithm is the journey.",
    link: "https://www.hello-algo.com/en/chapter_introduction/"
  },
  complexity: {
    number: "Node 02",
    status: "Measure before optimizing",
    title: "Complexity",
    summary: "Describe how resource use grows as the input grows. Big-O lets you compare ideas independently of a particular computer.",
    before: "Foundations",
    after: "Searching · Sorting · every design trade-off",
    hook: "Ignore the stopwatch; watch the growth curve.",
    link: "https://www.hello-algo.com/en/chapter_computational_complexity/"
  },
  arrays: {
    number: "Node 03",
    status: "Start with memory layout",
    title: "Arrays & lists",
    summary: "Arrays make indexed access cheap because values sit together. Linked lists trade that locality for flexible insertion through pointers.",
    before: "Foundations · Complexity",
    after: "Stacks & queues · Hashing · Searching",
    hook: "Array: jump by index. List: follow the links.",
    link: "https://www.hello-algo.com/en/chapter_array_and_linkedlist/"
  },
  stacks: {
    number: "Node 04",
    status: "Order controls behavior",
    title: "Stacks & queues",
    summary: "A stack exposes the newest item; a queue exposes the oldest. That single rule powers recursion, parsing, BFS, and task scheduling.",
    before: "Arrays & lists",
    after: "Trees · Graph traversal",
    hook: "Stack goes deep. Queue spreads wide.",
    link: "https://www.hello-algo.com/en/chapter_stack_and_queue/"
  },
  hashing: {
    number: "Node 05",
    status: "Trade order for direct access",
    title: "Hashing",
    summary: "A hash function maps a key to a bucket. With controlled collisions, lookup is usually constant-time even for large collections.",
    before: "Arrays & lists · Complexity",
    after: "Fast lookup · Graph adjacency maps · memoization",
    hook: "Turn a key into an address; plan for collisions.",
    link: "https://www.hello-algo.com/en/chapter_hashing/"
  },
  trees: {
    number: "Node 06",
    status: "Hierarchy with branches",
    title: "Trees",
    summary: "Trees organize parent-child relationships. Their shape determines whether search stays logarithmic or degrades into a linear walk.",
    before: "Stacks & queues · recursion",
    after: "Heaps · search trees · divide & conquer",
    hook: "The height is the cost of following one branch.",
    link: "https://www.hello-algo.com/en/chapter_tree/"
  },
  heaps: {
    number: "Node 07",
    status: "Keep the extreme nearby",
    title: "Heaps",
    summary: "A heap maintains a partial order so the smallest or largest value is always at the root, without fully sorting everything.",
    before: "Trees · arrays",
    after: "Priority queues · Top-k · greedy methods",
    hook: "Not fully sorted — only the winner is guaranteed.",
    link: "https://www.hello-algo.com/en/chapter_heap/"
  },
  graphs: {
    number: "Node 08",
    status: "Model arbitrary relationships",
    title: "Graphs",
    summary: "Vertices store entities and edges store relationships. BFS and DFS give you two fundamental ways to reveal the network.",
    before: "Stacks & queues · Hashing · Trees",
    after: "Shortest paths · connectivity · backtracking",
    hook: "Choose a frontier, then visit every reachable neighbor.",
    link: "https://www.hello-algo.com/en/chapter_graph/"
  },
  search: {
    number: "Node 09",
    status: "Use structure to discard work",
    title: "Searching",
    summary: "Linear search assumes nothing. Binary search exploits sorted or monotonic structure to remove half the possibilities each step.",
    before: "Complexity · Arrays",
    after: "Divide & conquer · boundary problems",
    hook: "If one answer rules out half, think binary search.",
    link: "https://www.hello-algo.com/en/chapter_searching/"
  },
  sorting: {
    number: "Node 10",
    status: "Ordering unlocks faster questions",
    title: "Sorting",
    summary: "Sorting pays an upfront cost to make later searching, grouping, deduplication, and comparison much easier.",
    before: "Complexity · Arrays",
    after: "Divide & conquer · greedy methods",
    hook: "Arrange once; ask many questions faster.",
    link: "https://www.hello-algo.com/en/chapter_sorting/"
  },
  divide: {
    number: "Node 11",
    status: "Split, solve, combine",
    title: "Divide & conquer",
    summary: "Break a problem into smaller independent copies, solve them recursively, and combine their answers into the whole.",
    before: "Searching · Sorting · Trees",
    after: "Merge sort · recursive construction · DP contrast",
    hook: "Independent halves combine; overlapping halves remember.",
    link: "https://www.hello-algo.com/en/chapter_divide_and_conquer/"
  },
  backtracking: {
    number: "Node 12",
    status: "Explore a decision tree",
    title: "Backtracking",
    summary: "Choose, recurse, and undo. Pruning stops a branch as soon as it cannot lead to a valid solution.",
    before: "Graphs · recursion",
    after: "Constraint search · Dynamic programming",
    hook: "Choose → explore → undo; prune as early as proof allows.",
    link: "https://www.hello-algo.com/en/chapter_backtracking/"
  },
  dynamic: {
    number: "Node 13",
    status: "Remember repeated work",
    title: "Dynamic programming",
    summary: "Define a state, write its transition, set base cases, and store results so overlapping subproblems are solved only once.",
    before: "Complexity · recursion · Divide & conquer",
    after: "Knapsack · edit distance · optimization problems",
    hook: "State means enough information to continue, but no more.",
    link: "https://www.hello-algo.com/en/chapter_dynamic_programming/"
  }
};

const topicEdges = [
  ["foundations", "complexity"], ["foundations", "arrays"],
  ["complexity", "arrays"], ["complexity", "search"], ["complexity", "sorting"],
  ["arrays", "stacks"], ["arrays", "hashing"], ["arrays", "search"],
  ["stacks", "trees"], ["stacks", "graphs"],
  ["hashing", "graphs"], ["trees", "heaps"], ["trees", "divide"],
  ["heaps", "graphs"], ["heaps", "sorting"], ["search", "divide"],
  ["sorting", "divide"], ["graphs", "backtracking"],
  ["divide", "dynamic"], ["backtracking", "dynamic"]
];

const roadmap = document.querySelector("#knowledge-graph");
const roadmapCanvas = document.querySelector("#roadmap-canvas");
const roadmapContext = roadmapCanvas.getContext("2d");
const topicButtons = [...document.querySelectorAll(".topic-node")];
let activeTopic = "foundations";
let exploredTopics = new Set(JSON.parse(localStorage.getItem("hello-algo-atlas-explored") || "[]"));
exploredTopics.add("foundations");

function fitCanvas(canvas, context) {
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.round(rect.width * ratio));
  const height = Math.max(1, Math.round(rect.height * ratio));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  return rect;
}

function drawRoadmap() {
  const bounds = fitCanvas(roadmapCanvas, roadmapContext);
  roadmapContext.clearRect(0, 0, bounds.width, bounds.height);
  const parent = roadmap.getBoundingClientRect();
  const points = {};

  topicButtons.forEach((button) => {
    const rect = button.getBoundingClientRect();
    points[button.dataset.topic] = {
      left: rect.left - parent.left,
      right: rect.right - parent.left,
      top: rect.top - parent.top,
      bottom: rect.bottom - parent.top,
      x: rect.left - parent.left + rect.width / 2,
      y: rect.top - parent.top + rect.height / 2
    };
  });

  topicEdges.forEach(([from, to]) => {
    const start = points[from];
    const end = points[to];
    if (!start || !end) return;
    const sameColumn = Math.abs(start.x - end.x) < 40;
    const x1 = sameColumn ? start.x : start.right;
    const y1 = sameColumn ? start.bottom : start.y;
    const x2 = sameColumn ? end.x : end.left;
    const y2 = sameColumn ? end.top : end.y;
    const active = from === activeTopic || to === activeTopic;
    const midX = sameColumn ? x1 : x1 + (x2 - x1) * .5;
    const midY = sameColumn ? y1 + (y2 - y1) * .5 : y1;

    roadmapContext.beginPath();
    roadmapContext.moveTo(x1, y1);
    if (sameColumn) {
      roadmapContext.bezierCurveTo(x1 + 18, midY, x2 + 18, midY, x2, y2);
    } else {
      roadmapContext.bezierCurveTo(midX, y1, midX, y2, x2, y2);
    }
    roadmapContext.strokeStyle = active ? cssColor("--blue") : cssColor("--line-strong");
    roadmapContext.lineWidth = active ? 2 : 1;
    roadmapContext.stroke();

    const angle = Math.atan2(y2 - (sameColumn ? midY : y2), x2 - (sameColumn ? x2 + 18 : midX));
    roadmapContext.beginPath();
    roadmapContext.moveTo(x2, y2);
    roadmapContext.lineTo(x2 - 6 * Math.cos(angle - Math.PI / 6), y2 - 6 * Math.sin(angle - Math.PI / 6));
    roadmapContext.lineTo(x2 - 6 * Math.cos(angle + Math.PI / 6), y2 - 6 * Math.sin(angle + Math.PI / 6));
    roadmapContext.closePath();
    roadmapContext.fillStyle = active ? cssColor("--blue") : cssColor("--line-strong");
    roadmapContext.fill();
  });
}

function updateTopic(topic) {
  activeTopic = topic;
  exploredTopics.add(topic);
  localStorage.setItem("hello-algo-atlas-explored", JSON.stringify([...exploredTopics]));

  topicButtons.forEach((button) => {
    const selected = button.dataset.topic === topic;
    button.classList.toggle("active", selected);
    button.classList.toggle("explored", exploredTopics.has(button.dataset.topic));
    button.setAttribute("aria-pressed", String(selected));
  });

  const data = topicData[topic];
  document.querySelector("#topic-number").textContent = data.number;
  document.querySelector("#topic-status").textContent = data.status;
  document.querySelector("#topic-title").textContent = data.title;
  document.querySelector("#topic-summary").textContent = data.summary;
  document.querySelector("#topic-before").textContent = data.before;
  document.querySelector("#topic-after").textContent = data.after;
  document.querySelector("#topic-hook").textContent = data.hook;
  document.querySelector("#topic-link").href = data.link;
  document.querySelector("#explored-count").textContent = `${exploredTopics.size} / ${topicButtons.length}`;
  document.querySelector("#explored-bar").style.width = `${(exploredTopics.size / topicButtons.length) * 100}%`;
  drawRoadmap();
}

topicButtons.forEach((button) => button.addEventListener("click", () => updateTopic(button.dataset.topic)));
updateTopic("foundations");

const traversalCanvas = document.querySelector("#traversal-canvas");
const traversalContext = traversalCanvas.getContext("2d");
const graphNodes = {
  A: [.12, .5], B: [.33, .22], C: [.34, .75], D: [.58, .12],
  E: [.59, .4], F: [.6, .78], G: [.84, .3], H: [.86, .7]
};
const graphEdges = [["A", "B"], ["A", "C"], ["B", "D"], ["B", "E"], ["C", "E"], ["C", "F"], ["D", "G"], ["E", "G"], ["E", "H"], ["F", "H"], ["G", "H"]];
const adjacency = {};
Object.keys(graphNodes).forEach((node) => { adjacency[node] = []; });
graphEdges.forEach(([a, b]) => { adjacency[a].push(b); adjacency[b].push(a); });
Object.values(adjacency).forEach((neighbors) => neighbors.sort());

let traversalMode = "bfs";
let frontier = ["A"];
let discovered = new Set(["A"]);
let visited = [];
let current = null;
let traversalStep = 0;
let autoTimer = null;

function traversalPositions(width, height) {
  const horizontalPad = Math.max(42, width * .05);
  const verticalPad = Math.max(50, height * .08);
  return Object.fromEntries(Object.entries(graphNodes).map(([name, [x, y]]) => [name, [
    horizontalPad + x * (width - horizontalPad * 2),
    verticalPad + y * (height - verticalPad * 2)
  ]]));
}

function drawTraversal() {
  const bounds = fitCanvas(traversalCanvas, traversalContext);
  traversalContext.clearRect(0, 0, bounds.width, bounds.height);
  const positions = traversalPositions(bounds.width, bounds.height);

  graphEdges.forEach(([a, b]) => {
    const [x1, y1] = positions[a];
    const [x2, y2] = positions[b];
    const traversed = visited.includes(a) && visited.includes(b);
    traversalContext.beginPath();
    traversalContext.moveTo(x1, y1);
    traversalContext.lineTo(x2, y2);
    traversalContext.strokeStyle = traversed ? cssColor("--green") : cssColor("--line-strong");
    traversalContext.lineWidth = traversed ? 2.5 : 1.5;
    traversalContext.stroke();
  });

  Object.entries(positions).forEach(([name, [x, y]]) => {
    let fill = cssColor("--surface-2");
    let stroke = cssColor("--line-strong");
    if (frontier.includes(name)) { fill = cssColor("--surface-3"); stroke = cssColor("--violet"); }
    if (visited.includes(name)) { fill = cssColor("--surface-3"); stroke = cssColor("--green"); }
    if (current === name) { fill = cssColor("--surface-3"); stroke = cssColor("--amber"); }

    traversalContext.beginPath();
    traversalContext.arc(x, y, Math.min(30, Math.max(23, bounds.width * .035)), 0, Math.PI * 2);
    traversalContext.fillStyle = fill;
    traversalContext.fill();
    traversalContext.strokeStyle = stroke;
    traversalContext.lineWidth = current === name ? 4 : 2.5;
    traversalContext.stroke();
    traversalContext.fillStyle = cssColor("--text");
    traversalContext.font = "800 16px ui-monospace, monospace";
    traversalContext.textAlign = "center";
    traversalContext.textBaseline = "middle";
    traversalContext.fillText(name, x, y);
  });
}

function stopAuto() {
  if (autoTimer) clearInterval(autoTimer);
  autoTimer = null;
  document.querySelector("#auto-play").textContent = "Auto play";
}

function resetTraversal() {
  stopAuto();
  frontier = ["A"];
  discovered = new Set(["A"]);
  visited = [];
  current = null;
  traversalStep = 0;
  document.querySelector("#step-label").textContent = "Ready";
  document.querySelector("#current-node").textContent = "Start at A";
  document.querySelector("#step-explanation").textContent = "Choose BFS or DFS, then advance one step at a time.";
  updateTraversalReadout();
}

function updateTraversalReadout() {
  document.querySelector("#frontier-label").textContent = traversalMode === "bfs" ? "Queue · first in, first out" : "Stack · last in, first out";
  const frontierView = document.querySelector("#frontier-items");
  const displayFrontier = traversalMode === "dfs" ? [...frontier].reverse() : frontier;
  frontierView.innerHTML = displayFrontier.length ? displayFrontier.map((node) => `<i>${node}</i>`).join("") : "<em>Empty</em>";
  const visitedView = document.querySelector("#visited-items");
  visitedView.innerHTML = visited.length ? visited.map((node) => `<i>${node}</i>`).join("") : "<em>Nothing visited yet</em>";
  document.querySelector("#invariant-text").textContent = traversalMode === "bfs"
    ? "The queue holds discovered nodes waiting for their turn. Its front is always processed next."
    : "The stack holds discovered branches. Its top is always processed next, so the newest branch wins.";
  drawTraversal();
}

function nextTraversalStep() {
  if (!frontier.length) {
    current = null;
    document.querySelector("#step-label").textContent = "Complete";
    document.querySelector("#current-node").textContent = `Order: ${visited.join(" → ")}`;
    document.querySelector("#step-explanation").textContent = `Every node reachable from A has been visited using ${traversalMode.toUpperCase()}.`;
    stopAuto();
    updateTraversalReadout();
    return false;
  }

  current = traversalMode === "bfs" ? frontier.shift() : frontier.pop();
  visited.push(current);
  traversalStep += 1;
  const newlyDiscovered = adjacency[current].filter((node) => !discovered.has(node));
  newlyDiscovered.forEach((node) => discovered.add(node));

  if (traversalMode === "bfs") {
    frontier.push(...newlyDiscovered);
  } else {
    frontier.push(...[...newlyDiscovered].reverse());
  }

  document.querySelector("#step-label").textContent = `Step ${traversalStep}`;
  document.querySelector("#current-node").textContent = `Visit ${current}`;
  const addText = newlyDiscovered.length ? ` Discover ${newlyDiscovered.join(", ")} and add ${newlyDiscovered.length === 1 ? "it" : "them"} to the ${traversalMode === "bfs" ? "back of the queue" : "top of the stack"}.` : " Every neighbor is already discovered.";
  document.querySelector("#step-explanation").textContent = `Remove ${current} from the ${traversalMode === "bfs" ? "front" : "top"}.${addText}`;
  updateTraversalReadout();
  return true;
}

document.querySelectorAll(".mode-button").forEach((button) => {
  button.addEventListener("click", () => {
    traversalMode = button.dataset.mode;
    document.querySelectorAll(".mode-button").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    resetTraversal();
  });
});

document.querySelector("#next-step").addEventListener("click", nextTraversalStep);
document.querySelector("#reset-traversal").addEventListener("click", resetTraversal);
document.querySelector("#auto-play").addEventListener("click", () => {
  if (autoTimer) { stopAuto(); return; }
  document.querySelector("#auto-play").textContent = "Pause";
  if (!frontier.length) resetTraversal();
  nextTraversalStep();
  autoTimer = setInterval(nextTraversalStep, 900);
});

resetTraversal();

const complexityCanvas = document.querySelector("#complexity-canvas");
const complexityContext = complexityCanvas.getContext("2d");
const inputSlider = document.querySelector("#input-size");
const complexitySeries = [
  { label: "O(1)", color: "--green", value: () => 1 },
  { label: "O(log n)", color: "--cyan", value: (n) => Math.log2(Math.max(2, n)) },
  { label: "O(n)", color: "--blue", value: (n) => n },
  { label: "O(n log n)", color: "--violet", value: (n) => n * Math.log2(Math.max(2, n)) },
  { label: "O(n²)", color: "--amber", value: (n) => n * n },
  { label: "O(2ⁿ)", color: "--rose", value: (n) => 2 ** n }
];

function formatOperations(value) {
  if (!Number.isFinite(value) || value >= 1e12) return value.toExponential(1).replace("+", "");
  if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
  return Math.round(value).toLocaleString();
}

function drawComplexity() {
  const bounds = fitCanvas(complexityCanvas, complexityContext);
  complexityContext.clearRect(0, 0, bounds.width, bounds.height);
  const nMax = Number(inputSlider.value);
  const padding = { left: 54, right: 24, top: 24, bottom: 46 };
  const width = Math.max(10, bounds.width - padding.left - padding.right);
  const height = Math.max(10, bounds.height - padding.top - padding.bottom);
  const yMax = 7;

  complexityContext.strokeStyle = cssColor("--line");
  complexityContext.fillStyle = cssColor("--muted");
  complexityContext.font = "11px ui-monospace, monospace";
  complexityContext.textAlign = "right";
  complexityContext.textBaseline = "middle";
  for (let power = 0; power <= yMax; power += 1) {
    const y = padding.top + height - (power / yMax) * height;
    complexityContext.beginPath();
    complexityContext.moveTo(padding.left, y);
    complexityContext.lineTo(padding.left + width, y);
    complexityContext.stroke();
    complexityContext.fillText(power === 0 ? "1" : `10^${power}`, padding.left - 9, y);
  }

  complexityContext.textAlign = "center";
  complexityContext.textBaseline = "top";
  [0, .25, .5, .75, 1].forEach((ratio) => {
    const x = padding.left + width * ratio;
    const value = Math.max(1, Math.round(nMax * ratio));
    complexityContext.fillText(String(value), x, padding.top + height + 12);
  });

  complexitySeries.forEach((series) => {
    complexityContext.beginPath();
    for (let sample = 1; sample <= 120; sample += 1) {
      const ratio = sample / 120;
      const n = Math.max(1, nMax * ratio);
      const raw = series.value(n);
      const logValue = Math.min(yMax, Math.log10(Math.max(1, raw)));
      const x = padding.left + width * ratio;
      const y = padding.top + height - (logValue / yMax) * height;
      if (sample === 1) complexityContext.moveTo(x, y);
      else complexityContext.lineTo(x, y);
    }
    complexityContext.strokeStyle = cssColor(series.color);
    complexityContext.lineWidth = 2.4;
    complexityContext.stroke();
  });
}

function updateComplexity() {
  const n = Number(inputSlider.value);
  document.querySelector("#input-value").textContent = n;
  document.querySelector("#complexity-pills").innerHTML = complexitySeries.map((series) => {
    const value = series.value(n);
    return `<div class="complexity-pill" style="--pill-color: ${cssColor(series.color)}"><span><i></i>${series.label}</span><b>${formatOperations(value)}</b></div>`;
  }).join("");
  document.querySelector("#scale-message").textContent = `At n = ${n}, quadratic work is ${n.toLocaleString()}× larger than linear work. Exponential work reaches ${formatOperations(2 ** n)} steps.`;
  drawComplexity();
}

inputSlider.addEventListener("input", updateComplexity);
updateComplexity();

const choiceData = {
  ordered: {
    title: "Binary search",
    description: "Discard half of the remaining search interval after every comparison.",
    question: "Is the predicate monotonic, so false values and true values form one boundary?"
  },
  shortest: {
    title: "Breadth-first search",
    description: "Explore the graph level by level; the first arrival gives the fewest edges in an unweighted graph.",
    question: "Are all edges equal-cost? If not, move from BFS to Dijkstra or another weighted path algorithm."
  },
  all: {
    title: "Backtracking",
    description: "Walk the choice tree, record complete candidates, and undo each choice before trying the next.",
    question: "Which partial choices prove that an entire branch cannot produce a valid answer?"
  },
  overlap: {
    title: "Dynamic programming",
    description: "Define reusable states and compute each repeated subproblem once with memoization or tabulation.",
    question: "What is the smallest state that contains everything needed to make the next transition?"
  },
  best: {
    title: "Greedy — after a proof",
    description: "Take the locally best move only when an exchange argument or invariant proves it preserves a global optimum.",
    question: "Can any optimal solution be transformed to include this local choice without becoming worse?"
  }
};

document.querySelectorAll(".choice-node").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".choice-node").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    const data = choiceData[button.dataset.choice];
    document.querySelector("#choice-title").textContent = data.title;
    document.querySelector("#choice-description").textContent = data.description;
    document.querySelector("#choice-question").textContent = data.question;
  });
});

const redraw = () => {
  drawRoadmap();
  drawTraversal();
  drawComplexity();
};

if ("ResizeObserver" in window) {
  const observer = new ResizeObserver(redraw);
  observer.observe(roadmap);
  observer.observe(traversalCanvas.parentElement);
  observer.observe(complexityCanvas.parentElement);
} else {
  window.addEventListener("resize", redraw);
}

window.addEventListener("load", redraw);
