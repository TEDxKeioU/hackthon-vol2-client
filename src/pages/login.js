import { useState } from "react";
import styles from "../styles/login.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login }= useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      
      if (response.ok) {
        console.log("Login successful:", data);
        login(email); // Call the login function from AuthContext
        // Redirect to the home page
        navigate("/");
      } else {
        console.error("Login failed:", data);
        // Handle login failure (e.g., show error message)
        if (response.status === 401) {
          alert("Invalid email or password. Please try again.");
        } else {
          alert(data.message || "Login failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle network error or other issues
      alert("Error during login: " + error.message);
    }
  }  

  return(
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Login</h1>
        </div>

        <div className={styles.form}>
          <label className={styles.label}>Email</label>
          <input
            type="text"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <label className={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleLogin} className={styles.button}>
            Login
          </button>
        </div>
        <div className={styles.notification_message}>
          Don't have an account? 
          <br />
          <span onClick={() => navigate("/signup")} className={styles.link}>
            Sign Up here
          </span>
        </div>
      </div>
    </>
  )
}