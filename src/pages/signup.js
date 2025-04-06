import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/signup.module.css";


export default function Signup() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [returnMessage, setReturnMessage] = useState("");

  async function handleSubmit(e) {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (userId.length < 4) {
      setError("User ID must be at least 4 characters long.");
      return;
    }
    if (name.length < 2) {
      setError("Name must be at least 2 characters long.");
      return;
    }
    if (!email.includes("@")) {
      setError("Invalid email address.");
      return;
    }
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          name: name,
          email: email,
          password: password,
        })
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        // Redirect to the login page
        navigate("/login");
        setReturnMessage("Signup successful. You can now log in.");
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("サーバとの通信に失敗しました。");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Sign Up</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <div className={styles.error}>{error}</div>}
        
        <label className={styles.label}>User ID</label>
        <input
          type="text"
          value={userId}
          placeholder="Enter your ID (such as @yamada)"
          onChange={(e) => setUserId(e.target.value)}
          className={styles.input}
          required
        />

        <label className={styles.label}>Name</label>
        <input
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
        />

        <label className={styles.label}>Email</label>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />

        <label className={styles.label}>Password</label>
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />

        <label className={styles.label}>Password(confirm)</label>
        <input
          type="password"
          value={confirmPassword}
          placeholder="Enter your password again"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
          required
        />

        <button type="submit" className={styles.button}>
          Sign Up
        </button>

        <p className={styles.switchLink}>
          Already have an account?
          <br />
          <span onClick={() => navigate("/login")} className={styles.link}>
            Login here
          </span>
        </p>
      </form>
      {returnMessage && <div className={styles.return_message}>{returnMessage}</div>}
    </div>
  );
}