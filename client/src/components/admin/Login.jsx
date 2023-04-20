import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const id = localStorage.getItem("id");
  if (id) {
    return <Navigate to="/admin" />;
  }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Move useNavigate outside of handleSubmit

  function handleSubmit(e) {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      localStorage.setItem("id", username);
      navigate("/admin"); // Use navigate function to redirect to "/admin" route
    } else {
      alert("Invalid username or password");
      setPassword("");
      setUsername("");
    }
  }
  return (
    <div className="flex justify-center items-center" style={{height: "500px"}}>
      <form className="bg-blue-300 shadow-md rounded px-8 pt-6 pb-8 mb-4" style={{width: "400px"}} onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="current-password"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
  </div>
  );
}
