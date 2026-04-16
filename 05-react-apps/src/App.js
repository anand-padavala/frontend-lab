import { Routes, Route, Link, useLocation } from "react-router-dom";
import CreditCardForm from "./components/CreditCard/CreditCardForm";
import UserProfileForm from "./components/UserProfile/UserProfileForm";
import UserList from "./components/UserList/UserList";
import "./App.css";

const apps = [
  { path: "/", label: "1. Credit Card", component: CreditCardForm },
  { path: "/profile", label: "2. User Profile", component: UserProfileForm },
  { path: "/users", label: "3. User Directory", component: UserList },
];

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <h1>React Apps</h1>
      <nav className="tab-bar">
        {apps.map((app) => (
          <Link
            key={app.path}
            to={app.path}
            className={location.pathname === app.path ? "tab active" : "tab"}
          >
            {app.label}
          </Link>
        ))}
      </nav>
      <div className="tab-content">
        <Routes>
          {apps.map((app) => (
            <Route key={app.path} path={app.path} element={<app.component />} />
          ))}
        </Routes>
      </div>
    </div>
  );
}

export default App;
