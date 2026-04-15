import UserContext from "./UserContext";
import MiddleComponent from "./MiddleComponent";

function Tab1_UseContext() {
  return (
    <UserContext.Provider value={{ name: "Anand", age: 25 }}>
      <div>
        <h2>useContext</h2>
        <p>Share data across components without passing props through every level.</p>

        <h3>1. User Context</h3>
        <p>UserProfile reads user data directly — MiddleComponent doesn't pass it as a prop.</p>
        <MiddleComponent />

        <h3 style={{ marginTop: "20px" }}>How it works</h3>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "10px",
            borderRadius: "6px",
          }}
        >
{`Without context (prop drilling):
  App → user → Middle → user → UserProfile

With context:
  App (Provider: user)
    └─ MiddleComponent     ← doesn't touch user
        └─ UserProfile     ← useContext(UserContext) reads directly

Three steps:
  1. createContext(default)       → create the channel
  2. <Context.Provider value={}>  → set the value (wraps the tree)
  3. useContext(Context)          → read the value (any nested component)`}
        </pre>
      </div>
    </UserContext.Provider>
  );
}

export default Tab1_UseContext;
