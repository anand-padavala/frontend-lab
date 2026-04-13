import { useState } from "react";
import ThemeContext from "./ThemeContext";
import UserContext from "./UserContext";
import MiddleComponent from "./MiddleComponent";
import UserProfile from "./UserProfile";

function Tab1_UseContext() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  function toggleUser() {
    setUser((prev) => (prev ? null : { name: "Anand", age: 25 }));
  }

  return (
    <ThemeContext.Provider value={theme}>
      <UserContext.Provider value={user}>
        <div>
          <h2>useContext</h2>
          <p>Share data across components without passing props through every level.</p>

          <h3>1. Theme Context</h3>
          <p>ThemedBox reads theme directly — MiddleComponent doesn't pass it as a prop.</p>
          <button onClick={toggleTheme} style={{ marginBottom: "10px" }}>
            Toggle Theme ({theme})
          </button>
          <MiddleComponent />

          <h3 style={{ marginTop: "20px" }}>2. User Context</h3>
          <p>UserProfile reads user data directly from context.</p>
          <button onClick={toggleUser} style={{ marginBottom: "10px" }}>
            {user ? "Logout" : "Login as Anand"}
          </button>
          <UserProfile />

          <h3 style={{ marginTop: "20px" }}>How it works</h3>
          <pre
            style={{
              backgroundColor: "#f5f5f5",
              padding: "10px",
              borderRadius: "6px",
            }}
          >
{`Without context (prop drilling):
  App → theme → Header → theme → Nav → theme → Button

With context:
  App (Provider: theme)
    └─ Header              ← doesn't touch theme
        └─ Nav             ← doesn't touch theme
            └─ Button      ← useContext(ThemeContext) reads directly

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

export default Tab1_UseContext;
