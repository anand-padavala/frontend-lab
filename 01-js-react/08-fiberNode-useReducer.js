//============================================================
// What to notice:
//
// 1. useReducer is like useState but for complex state logic.
// 2. Instead of setState(newValue), you dispatch({ type: "ACTION" }).
// 3. A reducer function decides how to update state based on the action.
// 4. Pattern: (currentState, action) → newState
// 5. Same pattern as Redux — all state transitions in one place.
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
// useReducer — like useState but with a reducer function
// ============================================================
function useReducer(reducer, initialState) {
  const fiber = currentFiber;
  const idx = hookIndex;

  // First render: store initial state
  if (fiber.hooks[idx] === undefined) {
    fiber.hooks[idx] = initialState;
  }

  const dispatch = (action) => {
    // Run the reducer: (currentState, action) → newState
    const currentState = fiber.hooks[idx];
    const newState = reducer(currentState, action);

    // Skip re-render if state didn't change
    if (JSON.stringify(currentState) === JSON.stringify(newState)) return;

    fiber.hooks[idx] = newState;
    console.log(`\n--- dispatch({ type: "${action.type}" }) → ${JSON.stringify(newState)} ---`);
    fiber.render();
  };

  const state = fiber.hooks[idx];
  hookIndex++;
  return [state, dispatch];
}

// ============================================================
// Reducer — all state transitions in one place
// ============================================================
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, todos: [...state.todos, action.text], count: state.count + 1 };
    case "REMOVE_LAST":
      return { ...state, todos: state.todos.slice(0, -1), count: state.count - 1 };
    case "CLEAR":
      return { ...state, todos: [], count: 0 };
    default:
      return state;
  }
}

// ============================================================
// Component
// ============================================================
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, { todos: [], count: 0 });

  const onAdd = (text) => dispatch({ type: "ADD", text });
  const onRemoveLast = () => dispatch({ type: "REMOVE_LAST" });
  const onClear = () => dispatch({ type: "CLEAR" });

  return {
    message: `  Todos (${state.count}): [${state.todos.join(", ")}]`,
    onAdd,
    onRemoveLast,
    onClear,
  };
}

// ============================================================
// Run it
// ============================================================
console.log("=== First render ===");
const fiber = new FiberNode(TodoApp);
fiber.render();

console.log("\n=== Add 'buy milk' ===");
fiber.component.onAdd("buy milk");

console.log("\n=== Add 'walk dog' ===");
fiber.component.onAdd("walk dog");

console.log("\n=== Add 'write code' ===");
fiber.component.onAdd("write code");

console.log("\n=== Remove last ===");
fiber.component.onRemoveLast();

console.log("\n=== Clear all ===");
fiber.component.onClear();

// ============================================================
// Compare useState vs useReducer:
//
//   useState:     simple values, independent updates
//                 setCount(prev => prev + 1)
//
//   useReducer:   complex state, related fields, many actions
//                 dispatch({ type: "ADD", text: "buy milk" })
//
// useReducer is useState under the hood — just with a reducer
// function deciding what the new state should be.
// ============================================================
