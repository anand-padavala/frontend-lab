// ============================================================
// What to notice:
//
// 1. useMemo caches a computed value in hooks[] — same array, by position.
// 2. It only recomputes when deps change (like useEffect, but synchronous).
// 3. Without useMemo, expensive computations run on EVERY render.
// 4. useMemo runs DURING render (not after like useEffect).
// ============================================================

// --- Global pointers ---
let currentFiber = null;
let hookIndex = 0;

class FiberNode {
  constructor(componentFn, props = {}) {
    this.componentFn = componentFn;
    this.props = props;
    this.hooks = [];
    this.effects = [];
  }

  render() {
    currentFiber = this;
    hookIndex = 0;

    this.component = this.componentFn(this.props);
    console.log(this.component.message);

    this._flushEffects();
    currentFiber = null;
  }

  _flushEffects() {
    for (const effect of this.effects) {
      if (effect.cleanup) {
        effect.cleanup();
      }
      const cleanup = effect.callback();
      effect.hook.cleanup = typeof cleanup === "function" ? cleanup : null;
    }
    this.effects = [];
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
// useEffect
// ============================================================
function useEffect(callback, deps) {
  const fiber = currentFiber;
  const idx = hookIndex;

  const prevHook = fiber.hooks[idx];

  let shouldRun = true;
  if (prevHook) {
    if (deps) {
      shouldRun = deps.some((dep, i) => dep !== prevHook.deps[i]);
    }
  }

  fiber.hooks[idx] = { deps, cleanup: prevHook ? prevHook.cleanup : null };

  if (shouldRun) {
    fiber.effects.push({
      callback,
      cleanup: prevHook ? prevHook.cleanup : null,
      hook: fiber.hooks[idx],
    });
  }

  hookIndex++;
}

// ============================================================
// useMemo — caches a value, recomputes only when deps change
// ============================================================
function useMemo(computeFn, deps) {
  const fiber = currentFiber;
  const idx = hookIndex;

  const prevHook = fiber.hooks[idx];

  // Check if deps changed
  let needsRecompute = true;
  if (prevHook) {
    needsRecompute = deps.some((dep, i) => dep !== prevHook.deps[i]);
  }

  if (needsRecompute) {
    const value = computeFn();  // run the expensive computation
    fiber.hooks[idx] = { value, deps };
    console.log(`  [useMemo] COMPUTED → ${value}`);
  } else {
    console.log(`  [useMemo] CACHED → ${prevHook.value}`);
  }

  hookIndex++;
  return fiber.hooks[idx].value;
}

// ============================================================
// Component — uses useMemo to avoid re-computing on every render
// ============================================================
function TodoApp(props) {
  const [todos] = useState(["buy milk", "walk dog", "write code", "read book", "cook dinner"]);
  const [filter, setFilter] = useState("all");
  const [count, setCount] = useState(0);

  // Expensive filter — only recompute when todos or filter changes
  const filteredTodos = useMemo(() => {
    // Simulate expensive work
    console.log(`  [useMemo] filtering todos with "${filter}"...`);
    if (filter === "short") return todos.filter(t => t.length < 10);
    return todos;
  }, [todos, filter]);

  const onToggleFilter = () => setFilter(prev => prev === "all" ? "short" : "all");
  const onIncrement = () => setCount(prev => prev + 1);

  return {
    message: `Filter: ${filter}, Todos: [${filteredTodos}], Count: ${count}`,
    onToggleFilter,
    onIncrement,
  };
}

// ============================================================
// Run it
// ============================================================
console.log("=== First render ===");
const fiber = new FiberNode(TodoApp);
fiber.render();

console.log("\n=== User clicks Increment (count changes, but useMemo skips) ===");
fiber.component.onIncrement();

console.log("\n=== User clicks Increment again (useMemo still skips) ===");
fiber.component.onIncrement();

console.log("\n=== User toggles filter (useMemo RECOMPUTES) ===");
fiber.component.onToggleFilter();

console.log("\n=== User toggles filter back (useMemo RECOMPUTES) ===");
fiber.component.onToggleFilter();
