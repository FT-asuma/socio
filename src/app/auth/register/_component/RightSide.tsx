"use client";
import styles from "../register.module.sass";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useAppContext } from "@/context/AppProvider";
import { signIn } from "next-auth/react";

const RightSide = () => {
  const { setNotification } = useAppContext();
  const handleGoogleLogin = () => {
    try {
      setNotification("Success! Signed in with Google");
    } catch (error: any) {
      setNotification(`Error: ${error.message}`);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signIn("github");
      setNotification("Success! Signed in with GitHub");
    } catch (error: any) {
      setNotification(`Error: ${error.message}`);
    }
  };

  return (
    <div className={styles.rightSideRegister}>
      <h2>Register</h2>
      <div className={styles.orText}>Continue with</div>
      <button className={styles.googleButton} onClick={()=> signIn("google")}>
        <FaGoogle /> Continue with Google
      </button>
      <button className={styles.githubButton} onClick={handleGithubLogin}>
        <FaGithub /> Continue with GitHub
      </button>
      <div className={styles.registerPrompt}>
        Already have an account?{" "}
        <a href="/auth/login" className={styles.registerLink}>
          Go login
        </a>
      </div>
    </div>
  );
};

export default RightSide;
