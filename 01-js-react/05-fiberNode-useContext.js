// ============================================================
// What to notice:
//
// 1. Context is a shared store — any component can read from it.
// 2. createContext returns an object with a value and a list of subscribers.
// 3. useContext reads the current value from that context object.
// 4. When context value changes, all subscribed fibers re-render.
// 5. Context solves "prop drilling" — no need to pass props through every level.
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
// createContext — creates a shared store with a default value
// ============================================================
function createContext(defaultValue) {
  return {
    value: defaultValue,
    subscribers: [],  // fibers that use this context
  };
}

// ============================================================
// useContext — reads the current value and subscribes for updates
// ============================================================
function useContext(context) {
  const fiber = currentFiber;

  // Subscribe this fiber (avoid duplicates)
  if (!context.subscribers.includes(fiber)) {
    context.subscribers.push(fiber);
  }

  return context.value;
}

// ============================================================
// Provider helper — updates context value and re-renders subscribers
// ============================================================
function setContextValue(context, newValue) {
  context.value = newValue;
  console.log(`\n--- Context updated to: ${JSON.stringify(newValue)} ---`);

  // Re-render all fibers that use this context
  for (const fiber of context.subscribers) {
    fiber.render();
  }
}

// ============================================================
// Create a context (like React.createContext)
// ============================================================
const ThemeContext = createContext("light");
const UserContext = createContext({ name: "Guest", role: "viewer" });

// ============================================================
// Components that consume context
// ============================================================
function Header() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);

  return { message: `  [Header] Theme: ${theme}, User: ${user.name} (${user.role})` };
}

function Dashboard() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [count, setCount] = useState(0);

  const onIncrement = () => setCount(prev => prev + 1);

  return {
    message: `  [Dashboard] Theme: ${theme}, Welcome ${user.name}, clicks: ${count}`,
    onIncrement,
  };
}

// ============================================================
// Run it
// ============================================================
console.log("=== First render ===");
const headerFiber = new FiberNode(Header);
const dashboardFiber = new FiberNode(Dashboard);
headerFiber.render();
dashboardFiber.render();

console.log("\n=== User clicks Increment (only Dashboard re-renders) ===");
dashboardFiber.component.onIncrement();

console.log("\n=== Theme changes to dark (BOTH re-render) ===");
setContextValue(ThemeContext, "dark");

console.log("\n=== User logs in (BOTH re-render) ===");
setContextValue(UserContext, { name: "Anand", role: "admin" });
