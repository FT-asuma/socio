"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

import styles from "@/app/page.module.sass";
import { Loading, Alert } from "@/components";

import { IAppContext, Ifeed } from "@/interface";
import { getFeed } from "@/hooks";

const defaultState: IAppContext = {
  theme: "light",
  setTheme: () => {},
  isUpdated: "Tashkent",
  setIsUpdated: () => {},
  notification: "",
  setNotification: () => {},
  isLoading: true,
  toggleTheme: () => {},
  setUser: () => {},
  user: null
};

const AppContext = createContext(defaultState);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("light");
  const [isUpdated, setIsUpdated] = useState<string>("");
  const [notification, setNotification] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isThemeLoaded, setThemeLoaded] = useState<boolean>(false);
  const [user, setUser] = useState()

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    setThemeLoaded(true);
    setLoading(false)
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (!isThemeLoaded || isLoading && !user)
    return (
      <main className={styles.loading}>
        <Loading />
      </main>
    );

  return (
    <AppContext.Provider
      value={{
        setTheme,
        theme,
        isUpdated,
        setIsUpdated,
        isLoading,
        setNotification,
        notification,
        toggleTheme,
        setUser,
        user
      }}
    >
      <main className={styles.page}>
        {notification && <Alert message={notification} />}
        {children}
      </main>
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppContext = () => {
  return useContext(AppContext);
};
