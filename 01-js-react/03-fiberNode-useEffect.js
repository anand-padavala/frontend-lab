// ============================================================
// What to notice:
//
// 1. useEffect stores its deps in hooks[] — same array as useState, by position.
// 2. After render, pending effects run. React does this after painting the DOM.
// 3. deps comparison decides if the effect re-runs:
//    - []        → run once on mount
//    - [count]   → run when count changes
//    - no array  → run every render
// 4. Cleanup runs BEFORE the next effect (e.g., removing an event listener).
// ============================================================

// --- Global pointers (React keeps these internally) ---
let currentFiber = null;
let hookIndex = 0;

class FiberNode {
  constructor(componentFn, props = {}) {
    this.componentFn = componentFn;
    this.props = props;
    this.hooks = [];
    this.effects = [];  // effects queued during render
  }

  render() {
    currentFiber = this;
    hookIndex = 0;

    this.component = this.componentFn(this.props);
    console.log(this.component.message);

    // Effects run AFTER render (React runs them after DOM paint)
    this._flushEffects();

    currentFiber = null;
  }

  _flushEffects() {
    for (const effect of this.effects) {
      // Run cleanup from the previous render first
      if (effect.cleanup) {
        effect.cleanup();
      }
      // Run the effect, store its cleanup back into hooks[]
      const cleanup = effect.callback();
      effect.hook.cleanup = typeof cleanup === "function" ? cleanup : null;
    }
    this.effects = [];
  }
}

// ============================================================
// useState — same as Step 2
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
// useEffect — stores deps in hooks[], queues effect to run after render
// ============================================================
function useEffect(callback, deps) {
  const fiber = currentFiber;
  const idx = hookIndex;

  const prevHook = fiber.hooks[idx];

  // Decide if effect should run
  let shouldRun = true;
  if (prevHook) {
    if (deps) {
      // Compare each dep with previous — run only if something changed
      shouldRun = deps.some((dep, i) => dep !== prevHook.deps[i]);
    }
    // no deps array → run every render (shouldRun stays true)
    // empty deps [] → only run on first render (prevHook exists, no changes)
  }

  // Store deps for next render's comparison
  fiber.hooks[idx] = { deps, cleanup: prevHook ? prevHook.cleanup : null };

  if (shouldRun) {
    fiber.effects.push({
      callback,
      cleanup: prevHook ? prevHook.cleanup : null,
      hook: fiber.hooks[idx],  // so _flushEffects can store new cleanup
    });
  }

  hookIndex++;
}

// ============================================================
// A component that uses useState + useEffect
// ============================================================
function Counter(props) {
  const [count, setCount] = useState(0);

  // Runs when count changes (like updating document title)
  useEffect(() => {
    console.log(`  [effect] count changed → ${count}`);
    return () => console.log(`  [cleanup] cleaning up for count ${count}`);
  }, [count]);

  // Runs once on mount (like fetching data)
  useEffect(() => {
    console.log(`  [effect] mounted! Welcome ${props.name}`);
    return () => console.log(`  [cleanup] unmounting`);
  }, []);

  const onIncrement = () => setCount(prev => prev + 1);

  return { message: `Hello ${props.name}, count = ${count}`, onIncrement };
}

// ============================================================
// Run it
// ============================================================
console.log("=== First render ===");
const fiber = new FiberNode(Counter, { name: "Anand" });
fiber.render();

console.log("\n=== User clicks Increment ===");
fiber.component.onIncrement();

console.log("\n=== User clicks Increment again ===");
fiber.component.onIncrement();
