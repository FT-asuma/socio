import styles from "./register.module.sass";
import RightSide from "./_component/RightSide";
import { signOut } from "next-auth/react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth();
  if (session?.user) redirect("/feed");
  return (
    <div className={styles.register}>
      <div className={styles.content}>
        <div className={styles.leftSide}>
          <h1>Welcome!</h1>
          <p>
            Sign Up to access your account and continue exploring our platform.
          </p>
        </div>
        <RightSide />
      </div>
    </div>
  );
};

export default LoginPage;
