// Tab 8b: useContext only — no other hooks

import { useContext, createContext } from "react";

// 1. Create contexts with default values
const ThemeContext = createContext("light");
const UserContext = createContext({ name: "Guest", role: "viewer" });

// ─── Child components — only read from context ────────────

function ThemedBox() {
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

function MiddleComponent() {
  return (
    <div style={{ padding: "10px", border: "1px dashed #aaa", marginTop: "10px" }}>
      <p>MiddleComponent — doesn't know about theme, just passes through</p>
      <ThemedBox />
    </div>
  );
}

function UserProfile() {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);

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

function Greeting() {
  const user = useContext(UserContext);
  return <p>Welcome back, <strong>{user.name}</strong>!</p>;
}

// ─── Main Component ────────────────────────────────────────
// Provider sets the values. All children read via useContext.
// No useState, no useEffect — just context flowing down the tree.

function Tab8_Only_UseContext() {
  return (
    <ThemeContext.Provider value="dark">
      <UserContext.Provider value={{ name: "Anand", role: "admin" }}>
        <div>
          <h2>useContext Only</h2>
          <p>No useState, no useEffect — components just read from context.</p>

          <h3>1. Theme Context</h3>
          <p>ThemedBox reads theme directly. MiddleComponent doesn't pass it as a prop.</p>
          <MiddleComponent />

          <h3 style={{ marginTop: "20px" }}>2. User Context</h3>
          <p>Multiple components read the same user context independently.</p>
          <UserProfile />
          <Greeting />

          <h3 style={{ marginTop: "20px" }}>3. Nested Providers (override)</h3>
          <p>A nested Provider overrides the value for its children only.</p>
          <ThemeContext.Provider value="light">
            <p>This ThemedBox is inside a nested Provider with value="light":</p>
            <ThemedBox />
          </ThemeContext.Provider>
          <p>This ThemedBox is outside the nested Provider, still "dark":</p>
          <ThemedBox />

          <h3 style={{ marginTop: "20px" }}>How it works</h3>
          <pre style={{ backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "6px" }}>
{`No hooks needed to READ context — just useContext.

useState is only needed if you want to CHANGE the context value
dynamically (like a toggle button). Without it, the value is
fixed by what the Provider sets.

Tree:
  ThemeContext.Provider (value="dark")
    UserContext.Provider (value={name: "Anand"})
      ├── MiddleComponent
      │     └── ThemedBox        ← useContext(ThemeContext) → "dark"
      ├── UserProfile            ← useContext(both) → "dark", "Anand"
      ├── Greeting               ← useContext(UserContext) → "Anand"
      └── ThemeContext.Provider (value="light")  ← nested override
            └── ThemedBox        ← useContext(ThemeContext) → "light"`}
          </pre>
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default Tab8_Only_UseContext;
