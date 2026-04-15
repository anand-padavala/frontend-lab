import { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

function Tab6_UseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>useReducer</h2>
      <p>Manage state with a reducer function. Like useState, but for state that has multiple actions.</p>

      <h3>Counter: {state.count}</h3>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => dispatch({ type: "decrement" })}
          style={{ padding: "8px 16px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}
        >
          - Decrement
        </button>
        <button
          onClick={() => dispatch({ type: "increment" })}
          style={{ padding: "8px 16px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}
        >
          + Increment
        </button>
        <button
          onClick={() => dispatch({ type: "reset" })}
          style={{ padding: "8px 16px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}
        >
          Reset
        </button>
      </div>

      <h3 style={{ marginTop: "20px" }}>How it works</h3>
      <pre
        style={{
          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderRadius: "6px",
        }}
      >
{`const [state, dispatch] = useReducer(reducer, initialState);

// Dispatch an action → reducer decides the new state
dispatch({ type: "increment" })

function reducer(state, action) {
  switch (action.type) {
    case "increment": return { count: state.count + 1 };
    case "decrement": return { count: state.count - 1 };
    case "reset":     return initialState;
  }
}

useState vs useReducer:
  useState     → setCount(count + 1)         — direct update
  useReducer   → dispatch({ type: "..." })   — action describes what happened

useReducer is better when:
  - State has multiple related values
  - Next state depends on the previous state
  - You have several different actions on the same state`}
      </pre>
    </div>
  );
}

export default Tab6_UseReducer;
