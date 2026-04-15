import { useContext } from "react";
import UserContext from "./UserContext";

function UserProfile() {
  const user = useContext(UserContext);

  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "6px",
        backgroundColor: "#e8f5e9",
        color: "#333",
      }}
    >
      <strong>{user.name}</strong> — age {user.age}
    </div>
  );
}

export default UserProfile;
