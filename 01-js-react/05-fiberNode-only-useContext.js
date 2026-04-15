// ============================================================
// FiberNode — useContext only (no useState)
// Run: node 05-fiberNode-only-useContext.js
// ============================================================
// What to notice:
//
// 1. Components have NO local state — they only read from context.
// 2. useContext subscribes the fiber so it re-renders when context changes.
// 3. setContextValue updates the shared value and re-renders all subscribers.
// 4. No hooks[] array needed — context is external, not stored in the fiber.
// ============================================================

let currentFiber = null;

class FiberNode {
  constructor(componentFn, props = {}) {
    this.componentFn = componentFn;
    this.props = props;
  }

  render() {
    currentFiber = this;
    this.component = this.componentFn(this.props);
    console.log(this.component.message);
    currentFiber = null;
  }
}

// ============================================================
// createContext — creates a shared store with a default value
// ============================================================
function createContext(defaultValue) {
  return {
    value: defaultValue,
    subscribers: [],
  };
}

// ============================================================
// useContext — reads the value and subscribes for updates
// ============================================================
function useContext(context) {
  const fiber = currentFiber;

  if (!context.subscribers.includes(fiber)) {
    context.subscribers.push(fiber);
  }

  return context.value;
}

// ============================================================
// setContextValue — updates context and re-renders all subscribers
// ============================================================
function setContextValue(context, newValue) {
  context.value = newValue;
  console.log(`\n--- Context updated to: ${JSON.stringify(newValue)} ---`);

  for (const fiber of context.subscribers) {
    fiber.render();
  }
}

// ============================================================
// Create contexts
// ============================================================
const ThemeContext = createContext("light");
const UserContext = createContext({ name: "Guest", role: "viewer" });

// ============================================================
// Components — only read from context, no local state
// ============================================================
function Header() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);

  return { message: `  [Header] Theme: ${theme}, User: ${user.name} (${user.role})` };
}

function Sidebar() {
  const theme = useContext(ThemeContext);

  return { message: `  [Sidebar] Theme: ${theme}` };
}

function Dashboard() {
  const user = useContext(UserContext);

  return { message: `  [Dashboard] Welcome ${user.name}!` };
}

// ============================================================
// Run it
// ============================================================
console.log("=== First render ===");
const headerFiber = new FiberNode(Header);
const sidebarFiber = new FiberNode(Sidebar);
const dashboardFiber = new FiberNode(Dashboard);
headerFiber.render();
sidebarFiber.render();
dashboardFiber.render();

console.log("\n=== Theme changes to dark ===");
console.log("(Header and Sidebar subscribed to ThemeContext, Dashboard is not)");
setContextValue(ThemeContext, "dark");

console.log("\n=== User logs in ===");
console.log("(Header and Dashboard subscribed to UserContext, Sidebar is not)");
setContextValue(UserContext, { name: "Anand", role: "admin" });
