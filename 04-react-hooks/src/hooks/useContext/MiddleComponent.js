import UserProfile from "./UserProfile";

// This component doesn't use user at all — it just passes through.
// Without context, you'd have to pass user as a prop here too.
function MiddleComponent() {
  return (
    <div style={{ padding: "10px", border: "1px dashed #aaa", marginTop: "10px" }}>
      <p>MiddleComponent — doesn't know about user</p>
      <UserProfile />
    </div>
  );
}

export default MiddleComponent;
