import { useState, useEffect } from "react";
import "./UserList.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="ul-message">Loading users...</p>;
  if (error) return <p className="ul-message ul-error">Error: {error}</p>;
  if (users.length === 0) return <p className="ul-message">No users found.</p>;

  return (
    <div className="ul-wrapper">
      <h2>User Directory</h2>
      <p className="ul-subtitle">Fetched {users.length} users from jsonplaceholder.typicode.com</p>

      <div className="ul-table-container">
        <table className="ul-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Company</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email.toLowerCase()}</td>
                <td>{user.phone.split(" ")[0]}</td>
                <td>{user.address.city}</td>
                <td>{user.company.name}</td>
                <td>{user.website}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
