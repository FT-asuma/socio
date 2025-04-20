"use client";
import React, { useEffect, useState } from "react";
import styles from "../login.module.sass";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useAppContext } from "@/context/AppProvider";
import { signIn } from "next-auth/react";

const RightSide = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const { setNotification } = useAppContext();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleGoogleLogin = async () => {
    try {
      signIn("google");
    } catch (error: any) {
      setNotification("Error! " + error.message);
    }
  };

  const handleGithubLogin = async () => {
    try {
      signIn("github");
    } catch (error: any) {
      setNotification("Error! " + error.message);
    }
  };

  useEffect(() => {
    if (email !== "" && password !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  return (
    <div className={styles.rightSideLogin}>
      <h2>Login</h2>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email or username"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={isDisabled}
          style={
            isDisabled
              ? { background: "var(--primary)", cursor: "not-allowed" }
              : {}
          }
          className={styles.submitButton}
        >
          Log In
        </button>
      </form>
      <div className={styles.orText}>or</div>
      <button className={styles.googleButton} onClick={handleGoogleLogin}>
        <FaGoogle /> Continue with Google
      </button>
      <button className={styles.githubButton} onClick={handleGithubLogin}>
        <FaGithub /> Continue with GitHub
      </button>
      <div className={styles.registerPrompt}>
        Are you new?{" "}
        <a href="/auth/register" className={styles.registerLink}>
          Go register
        </a>
      </div>
    </div>
  );
};

export default RightSide;
