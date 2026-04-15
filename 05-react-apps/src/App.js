import { useState } from "react";
import CreditCardForm from "./components/CreditCard/CreditCardForm";
import "./App.css";

const apps = [
  { label: "1. Credit Card", component: CreditCardForm },
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ActiveComponent = apps[activeIndex].component;

  return (
    <div className="app">
      <h1>React Apps</h1>
      <nav className="tab-bar">
        {apps.map((app, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={i === activeIndex ? "tab active" : "tab"}
          >
            {app.label}
          </button>
        ))}
      </nav>
      <div className="tab-content">
        <ActiveComponent />
      </div>
    </div>
  );
}

export default App;
