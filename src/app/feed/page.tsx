import { auth } from "@/auth";
import { Container, Feed, Header, Sidebar } from "@/components";
import styles from "./feed.module.sass";
import { redirect } from "next/navigation";

export default async function FeedPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  return (
    <div className={styles.feed}>
      <Header />
      <Container>
        <Sidebar
          email={session.user.email}
          image={session.user.image}
          name={session.user.name}
        />
        <Feed />
      </Container>
    </div>
  );
}
