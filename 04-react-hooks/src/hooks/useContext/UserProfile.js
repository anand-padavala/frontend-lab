import { useContext } from "react";
import UserContext from "./UserContext";
import ThemeContext from "./ThemeContext";

function UserProfile() {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);

  if (!user) return <p style={{ color: "#999" }}>No user logged in.</p>;

  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "6px",
        backgroundColor: theme === "dark" ? "#444" : "#e8f5e9",
        color: theme === "dark" ? "#fff" : "#333",
      }}
    >
      <strong>{user.name}</strong> — age {user.age}
    </div>
  );
}

export default UserProfile;
