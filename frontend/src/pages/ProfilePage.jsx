import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/current-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.data);
      } else {
        setMessage("Failed to load user data.");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setMessage("Error fetching user data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setMessage("");

    if (!oldPassword || !newPassword) {
      setMessage("Both fields are required.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Password changed successfully!");
      } else {
        setMessage("Failed to change password. Please try again.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("An error occurred.");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold text-center">Profile</h1>

      {message && <p className="text-center text-red-500 mt-2">{message}</p>}

      {user && (
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg mt-4 shadow-md">
          <p className="text-lg font-semibold">Full Name: {user.fullName}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Email: {user.email}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Username: {user.username}</p>
        </div>
      )}

      <h2 className="text-xl font-semibold mt-6">Change Password</h2>
      <div className="mt-3 space-y-2">
        <input
          type="password"
          placeholder="Old Password"
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          onClick={handleChangePassword}
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
