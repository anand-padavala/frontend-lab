// ============================================================
// What to notice:
//
// 1. useCallback caches a FUNCTION in hooks[] — same array, by position.
// 2. Returns the same function reference if deps haven't changed.
// 3. Without useCallback, a new function is created on every render.
// 4. useCallback is basically useMemo but specifically for functions:
//    useCallback(fn, deps)  ===  useMemo(() => fn, deps)
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
// useCallback — caches a function, returns same reference if deps unchanged
// ============================================================
function useCallback(fn, deps) {
  const fiber = currentFiber;
  const idx = hookIndex;

  const prevHook = fiber.hooks[idx];

  let needsUpdate = true;
  if (prevHook) {
    needsUpdate = deps.some((dep, i) => dep !== prevHook.deps[i]);
  }

  if (needsUpdate) {
    fiber.hooks[idx] = { fn, deps };
    console.log(`  [useCallback] NEW function created`);
  } else {
    console.log(`  [useCallback] SAME function reused`);
  }

  hookIndex++;
  return fiber.hooks[idx].fn;
}

// ============================================================
// Component
// ============================================================
function TodoApp() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");

  // This function only gets recreated when 'theme' changes
  const handleClick = useCallback(() => {
    console.log(`    → clicked! theme is ${theme}`);
  }, [theme]);

  const onIncrement = () => setCount(prev => prev + 1);
  const onToggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");

  return {
    message: `  count: ${count}, theme: ${theme}`,
    handleClick,
    onIncrement,
    onToggleTheme,
  };
}

// ============================================================
// Run it
// ============================================================
console.log("=== First render ===");
const fiber = new FiberNode(TodoApp);
fiber.render();
const firstHandleClick = fiber.component.handleClick;

console.log("\n=== User clicks Increment (count changes, useCallback reuses) ===");
fiber.component.onIncrement();
console.log(`  Same function? ${fiber.component.handleClick === firstHandleClick}`);  // true

console.log("\n=== User clicks Increment again (useCallback still reuses) ===");
fiber.component.onIncrement();
console.log(`  Same function? ${fiber.component.handleClick === firstHandleClick}`);  // true

console.log("\n=== User toggles theme (deps changed, NEW function) ===");
fiber.component.onToggleTheme();
console.log(`  Same function? ${fiber.component.handleClick === firstHandleClick}`);  // false
fiber.component.handleClick();  // uses new theme
