import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center p-5 border rounded shadow bg-white">
        <h1 className="mb-4">Welcome to HR Management System</h1>

        <div className="d-flex gap-3 justify-content-center">
          <Link to="/signin" className="btn btn-primary btn-lg">
            Sign In
          </Link>

          <Link to="/signup" className="btn btn-success btn-lg">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
