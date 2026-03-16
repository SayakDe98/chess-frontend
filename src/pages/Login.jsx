import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
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

      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Login failed");
        return;
      }

      // store JWT
      localStorage.setItem("token", data.token);

      toast.success("Login successful");

      navigate("/");

    } catch {
      toast.error("Server error");
    }
  }

  return (
    <div className="auth-container">

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

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
          Login
        </button>

      </form>

      <p className="login-link">
        Don't have an account?{" "}
        <span onClick={() => navigate("/signup")}>
          Sign up
        </span>
      </p>

    </div>
  );
}

export default Login;