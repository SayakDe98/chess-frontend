import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Signup failed");
        return;
      }

      toast.success("Account created successfully!");
      navigate("/login");

    } catch {
      toast.error("Server error");
    }
  }

  return (
    <div className="auth-container">

      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Sign Up
        </button>

      </form>

      <p className="login-link">
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>
          Login
        </span>
      </p>

    </div>
  );
}

export default Signup;