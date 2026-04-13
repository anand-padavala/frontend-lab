// Tab 8: useContext — share data without passing props through every level

import { useState, useContext, createContext } from "react";

// 1. Create a Context — this is the "channel" for sharing data
const ThemeContext = createContext("light");
const UserContext = createContext(null);

// ─── Example 1: Basic Context ──────────────────────────────

function ThemedBox() {
  // 3. Consume — any nested component can read the value directly
  const theme = useContext(ThemeContext);

  return (
    <div
      style={{
        padding: "15px",
        borderRadius: "8px",
        backgroundColor: theme === "dark" ? "#333" : "#f0f0f0",
        color: theme === "dark" ? "#fff" : "#333",
        border: "1px solid #ccc",
      }}
    >
      Current theme: <strong>{theme}</strong>
    </div>
  );
}

// This component doesn't use theme at all — it just passes through
// Without context, you'd have to pass theme as a prop here too
function MiddleComponent() {
  return (
    <div style={{ padding: "10px", border: "1px dashed #aaa", marginTop: "10px" }}>
      <p>MiddleComponent — doesn't know about theme</p>
      <ThemedBox />
    </div>
  );
}

// ─── Example 2: Multiple Contexts ──────────────────────────

function UserProfile() {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);

  if (!user) return <p style={{ color: "#999" }}>No user logged in.</p>;

  return (
    <div 
      style={{
        padding: "10px",
        borderRadius: "6px",
        backgroundColor: theme === "dark" ? "#444" : "#e8f5e9",
        color: theme === "dark" ? "#fff" : "#333",
      }}
    >
      <strong>{user.name}</strong> — {user.role}
    </div>
  );
}

// ─── Example 3: Context updates trigger re-renders ─────────

function RenderCounter() {
  const theme = useContext(ThemeContext);
  const renderTime = new Date().toLocaleTimeString();

  return (
    <p>
      RenderCounter sees theme: <strong>{theme}</strong> (rendered at {renderTime})
    </p>
  );
}

// ─── Main Component ────────────────────────────────────────

function Tab8_UseContext() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);

  function toggleTheme() {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  }

  function toggleUser() {
    setUser(prev =>
      prev ? null : { name: "Alice", role: "Developer" }
    );
  }

  return (
    // 2. Provide — wrap the tree with a Provider to set the value
    <ThemeContext.Provider value={theme}>
      <UserContext.Provider value={user}>
        <div>
          <h2>useContext</h2>
          <p>Share data across components without passing props through every level.</p>

          <h3>1. Basic Context (Theme)</h3>
          <p>ThemedBox reads the theme directly — MiddleComponent doesn't pass it as a prop.</p>
          <button onClick={toggleTheme} style={{ marginBottom: "10px" }}>
            Toggle Theme ({theme})
          </button>
          <MiddleComponent />

          <h3 style={{ marginTop: "20px" }}>2. Multiple Contexts</h3>
          <p>A component can consume multiple contexts at once.</p>
          <button onClick={toggleUser} style={{ marginBottom: "10px" }}>
            {user ? "Logout" : "Login as Alice"}
          </button>
          <UserProfile />

          <h3 style={{ marginTop: "20px" }}>3. Context Updates Re-render Consumers</h3>
          <p>When the Provider value changes, all consumers re-render automatically.</p>
          <RenderCounter />

          <h3 style={{ marginTop: "20px" }}>The Problem Context Solves</h3>
          <pre style={{ backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "6px" }}>
{`Without context (prop drilling):
  App → passes theme → Layout → passes theme → Sidebar → passes theme → Button

With context:
  App (Provider: theme)
    └─ Layout              ← doesn't need to know about theme
        └─ Sidebar         ← doesn't need to know about theme
            └─ Button      ← useContext(ThemeContext) → reads it directly

Three steps:
  1. createContext(default)       → create the channel
  2. <Context.Provider value={}>  → set the value (wraps the tree)
  3. useContext(Context)          → read the value (any nested component)`}
          </pre>
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default Tab8_UseContext;
