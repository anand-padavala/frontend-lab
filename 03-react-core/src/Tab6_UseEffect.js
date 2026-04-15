// Tab 6: useEffect — side effects (timers, API calls, etc.)

import { useState, useEffect } from "react";

function Tab6_UseEffect() {
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. Runs ONCE when component loads (empty [])
  useEffect(() => {
    console.log("Component loaded!");
  }, []);

  // 2. Runs every time count changes
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  // 3. Timer — runs once, cleans up when component unmounts
  useEffect(myfun, []);

  function myfun() {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
      console.log("This is running cont...");
    }, 1000);

    // Cleanup — runs when component unmounts
    return () => clearInterval(timer);
  }

  // 4. Fetch data from API
  function fetchUsers() {
    setLoading(true);

    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/users?_limit=3")
        .then(res => res.json())
        .then(users => {
          setData(users);
          setLoading(false);
        });
    }, 20000);
  }

  return (
    <div>
      <h2>useEffect</h2>
      <p>Run code when component loads, state changes, or component unmounts.</p>

      <h3>1. Runs Once (on load)</h3>
      <p>Check the console — "Component loaded!" printed once.</p>

      <h3>2. Runs When State Changes</h3>
      <p>Count: {count} (check browser tab title)</p>
      <button onClick={() => setCount(prev => prev + 1)}>+1</button>

      <h3>3. Timer (with cleanup)</h3>
      <p>Seconds: {seconds}</p>

      <h3>4. Fetch Data from API</h3>
      <button onClick={fetchUsers}>Load Users</button>
      {loading && <p>Loading...</p>}      
      {data && (
        <ul>
          {data.map(user => (
            <li key={user.id}>{user.name} — {user.email}</li>
          ))}
        </ul>
      )}

      <h3>How useEffect Works</h3>
      <pre style={{ backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "6px" }}>
{`useEffect(() => {
  // code to run
}, [dependencies]);

[]         → run ONCE on load
[count]    → run when count changes
no array   → run on EVERY render
return ()  → cleanup (timers, listeners)`}
      </pre>
    </div>
  );
}

export default Tab6_UseEffect;
