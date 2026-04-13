// ============================================================
// FiberNode — Step 6: Props + useState + useRef
// Run: node 06-fiberNode-useRef.js
// ============================================================
// What to notice:
//
// 1. useRef stores a value in hooks[] — same array, by position.
// 2. It returns { current: value } — an object with a .current property.
// 3. Changing ref.current does NOT trigger a re-render (unlike useState).
// 4. The same object persists across renders (same reference, not a copy).
// 5. Common uses: storing previous values, counting renders, holding timers.
// ============================================================

// --- Global pointers ---
let currentFiber = null;
let hookIndex = 0;

class FiberNode {
  constructor(componentFn, props = {}) {
    this.componentFn = componentFn;
    this.props = props;
    this.hooks = [];
  }

  render() {
    currentFiber = this;
    hookIndex = 0;
    this.component = this.componentFn(this.props);
    console.log(this.component.message);
    currentFiber = null;
  }
}

// ============================================================
// useState
// ============================================================
function useState(initialValue) {
  const fiber = currentFiber;
  const idx = hookIndex;

  if (fiber.hooks[idx] === undefined) {
    fiber.hooks[idx] = initialValue;
  }

  const setState = (newValue) => {
    const val = typeof newValue === "function"
      ? newValue(fiber.hooks[idx])
      : newValue;

    if (fiber.hooks[idx] === val) return;

    fiber.hooks[idx] = val;
    console.log(`\n--- setState called, hooks[${idx}] = ${val} ---`);
    fiber.render();
  };

  const value = fiber.hooks[idx];
  hookIndex++;
  return [value, setState];
}

// ============================================================
// useRef — stores a persistent { current } object, no re-render on change
// ============================================================
function useRef(initialValue) {
  const fiber = currentFiber;
  const idx = hookIndex;

  // First render: create the ref object. Next renders: reuse the same object.
  if (fiber.hooks[idx] === undefined) {
    fiber.hooks[idx] = { current: initialValue };
  }

  hookIndex++;
  return fiber.hooks[idx];  // always the SAME object reference
}

// ============================================================
// Component — uses useState and useRef together
// ============================================================
function Counter() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);
  const prevCount = useRef(null);

  // Track renders (no re-render triggered!)
  renderCount.current += 1;

  // Store previous count
  const prev = prevCount.current;
  prevCount.current = count;

  const onIncrement = () => setCount(prev => prev + 1);

  return {
    message: `  count: ${count}, previous: ${prev}, renders: ${renderCount.current}`,
    onIncrement,
  };
}

// ============================================================
// Run it
// ============================================================
console.log("=== First render ===");
const fiber = new FiberNode(Counter);
fiber.render();

console.log("\n=== User clicks Increment ===");
fiber.component.onIncrement();

console.log("\n=== User clicks Increment ===");
fiber.component.onIncrement();

console.log("\n=== User clicks Increment ===");
fiber.component.onIncrement();

// ============================================================
// Compare useState vs useRef:
//
//   useState:  value changes → re-render
//   useRef:    value changes → NO re-render
//
// Both persist across renders. The difference is whether
// changing the value tells React to re-render the component.
// ============================================================
