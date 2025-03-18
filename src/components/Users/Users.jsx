import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Users() {
  const [Users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/users",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(response.data.users); // Adjust based on API response structure
      } catch (error) {
        setError("Failed to fetch users.");
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h3>User List</h3>
      <ul>
        {Users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email} - {user.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}