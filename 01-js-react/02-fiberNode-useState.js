// ============================================================
// What to notice:
//
// 1. Props come from outside (parent), state lives inside the fiber.
// 2. hooks[] stores state by POSITION (index 0, 1, 2...).
//    That's why React says: never call hooks inside if/loops — the index would shift.
// 3. useState returns [value, setter]. The setter captures the fiber
//    and index via closure, so it always updates the right slot.
// 4. Calling setter triggers a re-render automatically.
// ============================================================

// --- Global pointers (React keeps these internally) ---
let currentFiber = null;
let hookIndex = 0;

class FiberNode {
  constructor(componentFn, props = {}) {
    this.componentFn = componentFn;
    this.props = props;
    this.hooks = [];  // state is stored here, by position
  }

  render() {
    // Point globals to this fiber so useState knows where to store data
    currentFiber = this;
    hookIndex = 0;
    this.component = this.componentFn(this.props);
    console.log(this.component.message);
    currentFiber = null;
  }
}

// ============================================================
// useState — reads/writes to currentFiber.hooks[index]
// ============================================================
function useState(initialValue) {
  const fiber = currentFiber;
  const idx = hookIndex;

  // First render: store initial value. Next renders: reuse existing.
  if (fiber.hooks[idx] === undefined) {
    fiber.hooks[idx] = initialValue;
  }

  const setState = (newValue) => {
    // Support functional updates: setState(prev => prev + 1)
    const val = typeof newValue === "function"
      ? newValue(fiber.hooks[idx])
      : newValue;

    if (fiber.hooks[idx] === val) return; // same value — skip re-render

    fiber.hooks[idx] = val;
    console.log(`\n--- setState called, hooks is now: [${fiber.hooks}] ---`);
    fiber.render(); // re-render
  };

  const value = fiber.hooks[idx];
  hookIndex++;
  return [value, setState];
}

// ============================================================
// A component that uses props AND state
// ============================================================
function Counter(props) {
  const [count, setCount] = useState(0);

  // Event handlers — just like onClick={() => setCount(...)} in React
  const onIncrement = () => setCount(prev => prev + 1);
  const onReset = () => setCount(0);

  return {
    message: `Hello ${props.name}, count = ${count}`,
    onIncrement,
    onReset,
  };
}

// ============================================================
// Run it
// ============================================================
console.log("=== First render ===");
const fiber = new FiberNode(Counter, { name: "Anand" });
fiber.render();

// Simulate user interactions — like clicking buttons
console.log("\n=== User clicks Increment ===");
fiber.component.onIncrement();  // like <button onClick={onIncrement}>

console.log("\n=== User clicks Increment again ===");
fiber.component.onIncrement();

console.log("\n=== User clicks Reset ===");
fiber.component.onReset();
