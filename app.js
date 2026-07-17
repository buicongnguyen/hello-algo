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

const structureData = {
  array: {
    kicker: "Direct access",
    complexity: "Access · O(1)",
    title: "Array",
    summary: "Values occupy neighboring memory slots, so an index can jump straight to its element. Moving later elements makes middle insertion expensive.",
    use: "You need fast indexed reads and cache-friendly iteration.",
    watch: "Middle insertions, deletions, and resizing can move many elements.",
    shape: "Contiguous slots",
    caption: "The address of an element follows directly from the base address and its index.",
    className: "array-visual",
    label: "Five array values stored in neighboring slots",
    html: "<i><small>0</small>12</i><i><small>1</small>24</i><i><small>2</small>36</i><i><small>3</small>48</i><i><small>4</small>60</i>",
    link: "https://www.hello-algo.com/en/chapter_array_and_linkedlist/"
  },
  linked: {
    kicker: "Flexible links",
    complexity: "Insert at node · O(1)",
    title: "Linked list",
    summary: "Each node stores a value and a reference to the next node. Changing references is cheap, but reaching position i requires following the chain.",
    use: "Length changes often and you already hold the node where an edit belongs.",
    watch: "Random access is linear, each node needs pointer space, and scattered storage is less cache-friendly.",
    shape: "Scattered nodes",
    caption: "The arrows—not physical adjacency—define the order.",
    className: "linked-visual",
    label: "Four linked-list nodes connected by references",
    html: "<i>12</i><i>24</i><i>36</i><i>48</i>",
    link: "https://www.hello-algo.com/en/chapter_array_and_linkedlist/"
  },
  stack: {
    kicker: "Newest item first",
    complexity: "Push / pop · O(1)",
    title: "Stack",
    summary: "A stack exposes one end: the last value pushed is the first one popped. The rule naturally models call frames, undo history, and DFS.",
    use: "You need nested work, reversal, backtracking, parsing, or depth-first exploration.",
    watch: "Only the top is directly available; searching through the stack remains linear.",
    shape: "LIFO frontier",
    caption: "Every push becomes the new top; every pop reveals the previous top.",
    className: "stack-visual",
    label: "Stack with the newest value shown at the top",
    html: "<i>12</i><i>24</i><i>36</i><i>48</i>",
    link: "https://www.hello-algo.com/en/chapter_stack_and_queue/"
  },
  queue: {
    kicker: "Oldest item first",
    complexity: "Enqueue / dequeue · O(1)",
    title: "Queue",
    summary: "New values join at the back while processing happens at the front. This preserves arrival order and makes breadth-first exploration possible.",
    use: "You need fair scheduling, buffering, level-order traversal, or shortest hops in an unweighted graph.",
    watch: "An array implementation needs a moving front or circular buffer to avoid shifting every value.",
    shape: "FIFO frontier",
    caption: "The first value to enter is the first value allowed to leave.",
    className: "queue-visual",
    label: "Queue flowing from the back toward the front",
    html: "<i>12</i><i>24</i><i>36</i><i>48</i>",
    link: "https://www.hello-algo.com/en/chapter_stack_and_queue/"
  },
  hash: {
    kicker: "Key to bucket",
    complexity: "Lookup · O(1) average",
    title: "Hash table",
    summary: "A hash function turns a key into a bucket index. Fast access depends on distributing keys well and resolving the collisions that still occur.",
    use: "Exact-key lookup matters more than sorted order or range queries.",
    watch: "High load factors increase collisions; expansion is expensive and worst-case lookup can degrade.",
    shape: "Bucket array",
    caption: "Different keys can map to the same bucket, so every implementation needs a collision strategy.",
    className: "hash-visual",
    label: "Five hash buckets with two values sharing one bucket",
    html: "<i><small>0</small><b>—</b></i><i><small>1</small><b>Ada</b></i><i><small>2</small><b>Lin<br>Ken</b></i><i><small>3</small><b>—</b></i><i><small>4</small><b>Grace</b></i>",
    link: "https://www.hello-algo.com/en/chapter_hashing/"
  },
  heap: {
    kicker: "Priority without full order",
    complexity: "Push / pop · O(log n)",
    title: "Heap",
    summary: "A max-heap guarantees that every parent is at least as large as its children. The root is immediately available even though siblings are not fully sorted.",
    use: "You repeatedly need the smallest or largest item, a priority queue, or Top-k results.",
    watch: "Finding an arbitrary value is still linear; a heap is not a fully sorted collection.",
    shape: "Complete tree in an array",
    caption: "Only the parent-child priority rule is guaranteed; that is enough to keep the winner at the root.",
    className: "heap-visual",
    label: "Max heap with the largest value at its root",
    html: "<div><i>98</i></div><div><i>72</i><i>81</i></div><div><i>31</i><i>44</i><i>65</i><i>57</i></div>",
    link: "https://www.hello-algo.com/en/chapter_heap/"
  }
};

const structureButtons = [...document.querySelectorAll(".structure-tab")];

function updateStructure(name) {
  const data = structureData[name];
  structureButtons.forEach((button) => {
    const selected = button.dataset.structure === name;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  document.querySelector("#structure-kicker").textContent = data.kicker;
  document.querySelector("#structure-complexity").textContent = data.complexity;
  document.querySelector("#structure-title").textContent = data.title;
  document.querySelector("#structure-summary").textContent = data.summary;
  document.querySelector("#structure-use").textContent = data.use;
  document.querySelector("#structure-watch").textContent = data.watch;
  document.querySelector("#structure-shape-label").textContent = data.shape;
  document.querySelector("#structure-caption").textContent = data.caption;
  document.querySelector("#structure-link").href = data.link;
  const visual = document.querySelector("#structure-visual");
  visual.className = `structure-visual ${data.className}`;
  visual.setAttribute("aria-label", data.label);
  visual.innerHTML = data.html;
}

structureButtons.forEach((button) => button.addEventListener("click", () => updateStructure(button.dataset.structure)));

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

const motionVideos = [...document.querySelectorAll(".motion-video")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function updateMotionControl(video) {
  const button = video.parentElement.querySelector("[data-motion-toggle]");
  const playing = !video.paused;
  button.setAttribute("aria-pressed", String(playing));
  button.querySelector("span").textContent = playing ? "Ⅱ" : "▶";
  button.querySelector("b").textContent = playing ? "Pause animation" : "Play animation";
}

function playMotion(video, explicit = false) {
  if (reducedMotion.matches && !explicit) {
    video.pause();
    updateMotionControl(video);
    return;
  }
  video.play().then(() => updateMotionControl(video)).catch(() => {
    video.pause();
    updateMotionControl(video);
  });
}

motionVideos.forEach((video) => {
  video.dataset.userPaused = "false";
  const button = video.parentElement.querySelector("[data-motion-toggle]");
  button.addEventListener("click", () => {
    if (video.paused) {
      video.dataset.userPaused = "false";
      playMotion(video, true);
    } else {
      video.dataset.userPaused = "true";
      video.pause();
      updateMotionControl(video);
    }
  });
  video.addEventListener("play", () => updateMotionControl(video));
  video.addEventListener("pause", () => updateMotionControl(video));
  updateMotionControl(video);
});

if ("IntersectionObserver" in window) {
  const motionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting && video.dataset.userPaused !== "true") playMotion(video);
      else {
        video.pause();
        updateMotionControl(video);
      }
    });
  }, { threshold: .35 });
  motionVideos.forEach((video) => motionObserver.observe(video));
}

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

const binaryValues = [3, 8, 13, 18, 25, 31, 42, 57, 68, 74, 86, 93];
const binaryTarget = document.querySelector("#binary-target");
const binaryNext = document.querySelector("#binary-next");
let binaryLow = 0;
let binaryHigh = binaryValues.length - 1;
let binaryMid = null;
let binaryStep = 0;
let binaryFound = null;
let binaryDone = false;

function renderBinary() {
  const target = Number(binaryTarget.value);
  document.querySelector("#binary-array").innerHTML = binaryValues.map((value, index) => {
    const classes = ["binary-cell"];
    if (index < binaryLow || index > binaryHigh) classes.push("discarded");
    else classes.push("candidate");
    if (index === binaryMid) classes.push("midpoint");
    if (index === binaryFound) classes.push("found");
    return `<i class="${classes.join(" ")}"><span>${value}</span><small>${index}</small></i>`;
  }).join("");
  document.querySelector("#binary-low").textContent = binaryLow > binaryHigh ? "—" : binaryLow;
  document.querySelector("#binary-mid").textContent = binaryMid ?? "—";
  document.querySelector("#binary-high").textContent = binaryLow > binaryHigh ? "—" : binaryHigh;
  binaryNext.disabled = binaryDone;
  binaryNext.textContent = binaryDone ? (binaryFound === null ? "Not present" : "Found") : "Compare midpoint";
  binaryNext.setAttribute("aria-label", `Compare the midpoint while searching for ${target}`);
}

function resetBinary() {
  binaryLow = 0;
  binaryHigh = binaryValues.length - 1;
  binaryMid = null;
  binaryStep = 0;
  binaryFound = null;
  binaryDone = false;
  const target = Number(binaryTarget.value);
  document.querySelector("#binary-step").textContent = "Ready";
  document.querySelector("#binary-status").textContent = `Search for ${target}`;
  document.querySelector("#binary-explanation").textContent = "The full sorted array is the first candidate interval.";
  renderBinary();
}

function nextBinaryStep() {
  if (binaryDone) return;
  const target = Number(binaryTarget.value);
  binaryMid = Math.floor((binaryLow + binaryHigh) / 2);
  const value = binaryValues[binaryMid];
  binaryStep += 1;
  document.querySelector("#binary-step").textContent = `Comparison ${binaryStep}`;

  if (value === target) {
    binaryFound = binaryMid;
    binaryDone = true;
    document.querySelector("#binary-status").textContent = `Found ${target} at index ${binaryMid}`;
    document.querySelector("#binary-explanation").textContent = `The midpoint value is ${value}, exactly the target. The search stops.`;
  } else if (value < target) {
    const previous = binaryMid;
    binaryLow = binaryMid + 1;
    document.querySelector("#binary-status").textContent = `${value} is too small`;
    document.querySelector("#binary-explanation").textContent = `Discard indices 0 through ${previous}. Sorted order proves none of those values can equal ${target}.`;
  } else {
    const previous = binaryMid;
    binaryHigh = binaryMid - 1;
    document.querySelector("#binary-status").textContent = `${value} is too large`;
    document.querySelector("#binary-explanation").textContent = `Discard indices ${previous} through ${binaryValues.length - 1}. Sorted order proves none of those values can equal ${target}.`;
  }

  if (!binaryDone && binaryLow > binaryHigh) {
    binaryDone = true;
    document.querySelector("#binary-status").textContent = `${target} is not present`;
    document.querySelector("#binary-explanation").textContent = "The candidate interval is empty, so the target cannot be in the array.";
  }
  renderBinary();
}

binaryTarget.addEventListener("change", resetBinary);
binaryNext.addEventListener("click", nextBinaryStep);
document.querySelector("#binary-reset").addEventListener("click", resetBinary);
resetBinary();

document.querySelectorAll(".sort-filter").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.sortFilter;
    document.querySelectorAll(".sort-filter").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    document.querySelectorAll(".sorting-table tbody tr").forEach((row) => {
      row.hidden = filter !== "all" && row.dataset.sortFamily !== filter;
    });
  });
});

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
