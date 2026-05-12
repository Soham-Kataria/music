import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { authService } from "../../api/authService";
import Alert from "../Common/Alert";
import { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const data = await authService.login({ email, password });
      login(data.token, data.user);
      navigate("/");
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      setError(axiosError.response?.data?.message || "Login failed");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <Alert type="error" message={error} />}
      <input
        className="common-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="common-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="common-button" type="submit">Login</button>

      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Don't have an account?{" "}
        <Link to="/register" style={{ color: "#1db954", fontWeight: "600" }}>
          Register
        </Link>
      </p>
    </form>
  );
};

export default Login;
