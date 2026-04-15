import { useState } from "react";
import UserContext from "./UserContext";
import MiddleComponent from "./MiddleComponent";

function Tab2_ChangeContext() {
  const [user, setUser] = useState({ name: "Anand", age: 25 });

  function handleNameChange(e) {
    setUser((prev) => ({ ...prev, name: e.target.value }));
  }

  function handleAgeChange(e) {
    setUser((prev) => ({ ...prev, age: Number(e.target.value) }));
  }

  return (
    <UserContext.Provider value={user}>
      <div>
        <h2>useContext — Changing Values</h2>
        <p>When the Provider's value changes, all consumers re-render automatically.</p>

        <h3>Update User</h3>
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <label>
            Name:{" "}
            <input
              value={user.name}
              onChange={handleNameChange}
              style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </label>
          <label>
            Age:{" "}
            <input
              type="number"
              value={user.age}
              onChange={handleAgeChange}
              style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #ccc", width: "60px" }}
            />
          </label>
        </div>

        <h3>Consumer (reads from context)</h3>
        <MiddleComponent />

        <h3 style={{ marginTop: "20px" }}>How it works</h3>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "10px",
            borderRadius: "6px",
          }}
        >
{`Provider value is tied to state:
  const [user, setUser] = useState({ name: "Anand", age: 25 });

  <UserContext.Provider value={user}>
    └─ MiddleComponent
        └─ UserProfile  ← useContext(UserContext) re-renders on change

When setUser updates the state:
  1. Provider gets a new value
  2. All useContext(UserContext) consumers re-render
  3. MiddleComponent does NOT re-render (it doesn't use context)`}
        </pre>
      </div>
    </UserContext.Provider>
  );
}

export default Tab2_ChangeContext;
