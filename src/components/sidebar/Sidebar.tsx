"use client";
import React, { useEffect, useState } from "react";
import styles from "./sidebar.module.sass";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { removeUser } from "@/hooks/user/removeUser";
import { getUser } from "@/hooks/user";
import { useAppContext } from "@/context/AppProvider";
import UserInfo from "./_components/UserInfo";

const Sidebar = (session: { name: any; email: any; image: any }) => {
  const { isLoading, user, setUser } = useAppContext();
  const [userModal, setUserModal] = useState(false);
  useEffect(() => {
    if (isLoading === false && session?.email) {
      const fetchUser = async (email: string) => {
        const userLoaded = await getUser(email);
        if (!userLoaded) {
          setUserModal(true);
          setUser(session);
          console.clear();
        } else if (!user || user.email !== userLoaded.email) {
          // Update user only if it's not already set
          setUser(userLoaded);
        }
      };

      fetchUser(session.email);
    }
  }, [session, isLoading, setUser, setUserModal]);

  const listRenderer = (
    title: string,
    icon: string,
    url: string | undefined
  ) => {
    return (
      <li key={title}>
        <Link href={`/${icon}${url ? `s/${url.split("@")[0]}` : ""}`}>
          <button>
            <Image
              src={`/icons/${icon}.svg`}
              alt={title}
              width={32}
              height={32}
            />
          </button>
          <p>{title}</p>
        </Link>
      </li>
    );
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarCont}>
        <div className={styles.userProfile}>
          <Image
            src={session.image ? session.image : "/images/user-image.png"}
            alt="user image"
            width={100}
            height={100}
          />
          <h2>{session.name}</h2>
        </div>
        <div className={styles.options}>
          <h2>Explore panel</h2>
          <ul className={styles.links}>
            {[
              {
                title: "Profile",
                icon: "profile",
                url: session.email,
              },
              {
                title: "Find friends",
                icon: "friends",
              },
              {
                title: "User analytics",
                icon: "analytics",
              },
            ].map((e) => listRenderer(e.title, e.icon, e.url))}
          </ul>
        </div>
        <div className={styles.options}>
          <h2>Settings</h2>
          <ul>
            {[
              {
                title: "Settings",
                icon: "settings",
                url: "",
              },
              {
                title: "Security data",
                icon: "security",
              },
            ].map((e) => listRenderer(e.title, e.icon, e.url))}
            <li
              onClick={() => {
                signOut();
                removeUser();
              }}
              className={styles.logOut}
            >
              <Link href={`#`}>
                <button>
                  <Image
                    src={"/icons/log-out.svg"}
                    alt="log out icon"
                    width={32}
                    height={32}
                  />
                </button>
                <p>Log out</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <UserInfo
        setUser={setUser}
        user={session}
        userModal={userModal}
        setUserModal={setUserModal}
      />
    </aside>
  );
};

export default Sidebar;
