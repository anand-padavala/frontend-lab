// ============================================================
// FiberNode — Lifecycle methods
// Run: node 09-fiberNode-lifecycle.js
// ============================================================
// React component lifecycle:
//
//   Mount    → component appears on screen for the first time
//   Render   → component function runs, produces output
//   Update   → props or state change, component re-renders
//   Unmount  → component is removed from screen
//
// Flow:
//   mount → render → (user interacts) → update → render → ... → unmount
// ============================================================

class FiberNode {
  constructor(name, props = {}) {
    this.name = name;
    this.props = props;
    this.state = {};
    this.mounted = false;
    console.log(`[${this.name}] constructor — fiber created with props:`, props);
  }

  // Called once when component first appears
  mount() {
    console.log(`[${this.name}] mount — component added to the DOM`);
    console.log(`[${this.name}]   → useEffect(() => {...}, []) runs here`);
    console.log(`[${this.name}]   → subscriptions, fetch calls, timers start here`);
    this.mounted = true;
    this.render();
  }

  // Called every time props or state change
  render() {
    console.log(`[${this.name}] render — component function runs`);
    console.log(`[${this.name}]   → reads props:`, this.props);
    console.log(`[${this.name}]   → reads state:`, this.state);
    console.log(`[${this.name}]   → returns output (JSX in real React)`);
  }

  // Called when props or state change
  update(newPropsOrState) {
    console.log(`[${this.name}] update — change detected`);
    console.log(`[${this.name}]   → old props/state:`, { ...this.props, ...this.state });

    // Apply changes
    if (newPropsOrState.props) this.props = { ...this.props, ...newPropsOrState.props };
    if (newPropsOrState.state) this.state = { ...this.state, ...newPropsOrState.state };

    console.log(`[${this.name}]   → new props/state:`, { ...this.props, ...this.state });
    console.log(`[${this.name}]   → useEffect cleanup runs (for changed deps)`);
    console.log(`[${this.name}]   → useEffect callback runs (for changed deps)`);
    this.render();
  }

  // Called when component is removed from screen
  unmount() {
    console.log(`[${this.name}] unmount — component removed from the DOM`);
    console.log(`[${this.name}]   → useEffect cleanup runs (all effects)`);
    console.log(`[${this.name}]   → timers cleared, subscriptions cancelled`);
    this.mounted = false;
  }
}

// ============================================================
// Simulate a component's full life
// ============================================================

console.log("========== App starts ==========\n");

// 1. Component is created and mounted
console.log("--- Step 1: Component mounts ---");
const header = new FiberNode("Header", { title: "Hello", theme: "light" });
header.mount();

console.log("\n--- Step 2: User changes theme (props update) ---");
header.update({ props: { theme: "dark" } });

console.log("\n--- Step 3: Internal state changes (like setState) ---");
header.update({ state: { menuOpen: true } });

console.log("\n--- Step 4: Another state change ---");
header.update({ state: { menuOpen: false } });

console.log("\n--- Step 5: User navigates away (unmount) ---");
header.unmount();

console.log("\n========== App ends ==========");

// ============================================================
// Real React maps these to:
//
//   constructor  → function component is defined
//   mount        → React calls component for the first time
//                   useEffect(() => {...}, []) runs after first render
//   render       → component function body runs
//   update       → setState or new props trigger re-render
//                   useEffect cleanup + callback run for changed deps
//   unmount      → component removed from tree
//                   useEffect cleanup runs for ALL effects
// ============================================================
