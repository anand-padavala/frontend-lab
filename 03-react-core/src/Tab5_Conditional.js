// Tab 5: Conditional rendering — show/hide based on conditions

import { useState } from "react";

function Tab5_Conditional() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const score = 90;

  return (
    <div>
      <h2>Conditional Rendering</h2>
      <p>Show or hide things based on conditions.</p>

      <h3>1. Ternary (condition ? yes : no)</h3>
      <p>{isLoggedIn ? "Welcome back!" : "Please log in"}</p>
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "Log out" : "Log in"}
      </button>

      <h3>2. Show/Hide with &&</h3>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide" : "Show"} Details
      </button>
      {showDetails && <p>Here are the secret details!</p>}

      <h3>3. Multiple Conditions</h3>
      <p>Score: {score}</p>
      <p>Grade: {score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F"}</p>
    </div>
  );
}

export default Tab5_Conditional;
