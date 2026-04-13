// Tab 3: State — data that changes over time

import { useState } from "react";

function Tab3_State() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(["Apple", "Banana"]);
  const [user, setUser] = useState({ name: "Anand", score: 0 });

  return (
    <div>
      <h2>State (useState)</h2>
      <p>State holds data that changes. When state changes, React re-renders.</p>

      <h3>1. Counter: {count}</h3>
      <button onClick={() => setCount(prev => prev + 1)}>+1</button>{" "}
      <button onClick={() => setCount(prev => prev - 1)}>-1</button>{" "}
      <button onClick={() => setCount(0)}>Reset</button>

      <h3>2. Array State</h3>
      <ul>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      <button onClick={() => setItems(prev => [...prev, "Mango"])}>Add Mango</button>{" "}
      <button onClick={() => setItems(prev => prev.slice(0, -1))}>Remove Last</button>{" "}
      <button onClick={() => setItems(prev => [...prev].reverse())}>Reverse</button>

      <h3>3. Object State</h3>
      <p>Name: {user.name}, Score: {user.score}</p>
      <button onClick={() => setUser(prev => ({ ...prev, score: prev.score + 10 }))}>+10 Score</button>{" "}
      <button onClick={() => setUser(prev => ({ ...prev, name: "John" }))}>Change Name</button>
    </div>
  );
}

export default Tab3_State;
