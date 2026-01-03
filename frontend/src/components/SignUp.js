import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    employeeId: "",
    email: "",
    password: "",
    role: "Employee",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    alert("Account created successfully! (email verification later)");

    navigate("/signin");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h2 className="text-center mb-3">Sign Up</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Employee ID</label>
          <input
            className="form-control"
            name="employeeId"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            name="email"
            type="email"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            className="form-control"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Role</label>
          <select
            name="role"
            className="form-select"
            onChange={handleChange}
          >
          <option>Employee</option>
          <option>HR</option>
          </select>
        </div>

        <button className="btn btn-success w-100">Create Account</button>
      </form>

      <p className="mt-3 text-center">
        Already have an account? <Link to="/signin">Login</Link>
      </p>
    </div>
  );
}
    