// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import apiClient from "../../api/apiClient";
// import Alert from "../Common/Alert";

// const Register = () => {
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const res = await apiClient.post("/auth/register", {
//         username,
//         email,
//         password,
//       });
//       // Automatically login user after successful registration
//       login(res.data.token, res.data.user);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <form className="auth-form" onSubmit={handleSubmit}>
//       <h2>Register</h2>
//       {error && <Alert type="error" message={error} />}
//       <input
//         className="common-input"
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         required
//       />
//       <input
//         className="common-input"
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         className="common-input"
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button className="common-button" type="submit">Register</button>

//       <p style={{ marginTop: "1rem", textAlign: "center" }}>
//         Already have an account?{" "}
//         <Link to="/login" style={{ color: "#1db954", fontWeight: "600" }}>
//           Login
//         </Link>
//       </p>
//     </form>
//   );
// };

// export default Register;
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiClient from "../../api/apiClient";
import Alert from "../Common/Alert";
import Input from "../Common/Input";   // Common Input
import Button from "../Common/Button"; // Common Button

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");       // new field
  const [dateOfBirth, setDateOfBirth] = useState(""); // new field
  const [location, setLocation] = useState("");       // new field
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await apiClient.post("/auth/register", {
        username,
        email,
        password,
        bio,
        dateOfBirth,
        location,
      });
      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <Alert type="error" message={error} />}

      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Input
        type="text"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <Input
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <Button type="submit">Register</Button>

      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#1db954", fontWeight: "600" }}>
          Login
        </Link>
      </p>
    </form>
  );
};

export default Register;
