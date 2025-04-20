"use client";
import { useEffect, useState, useCallback } from "react";
import styles from "./feed.module.sass";
import { Media, Post } from "./post";
import { IFeedList } from "@/interface";
import { getFeed } from "@/hooks";
import { useAppContext } from "@/context/AppProvider";

const Feed = () => {
  const [newPost, setNewPost] = useState<IFeedList[]>([]);
  const [feed, setFeed] = useState<IFeedList[]>([]);
  const { setNotification } = useAppContext();
  const fetchFeed = useCallback(async () => {
    try {
      const feedData: any = await getFeed({ setNotification });
      setFeed(feedData);
    } catch (error) {
      setNotification(`Error! Something went wrong: ` + error);
    }
  }, [setNotification]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);
  if (!feed) return <div>Loading...</div>;
  return (
    <div className={styles.feed}>
      <div className={styles.wrapper}>
        <Post setNewPost={setNewPost} />
        {newPost.map((post) => (
          <Media key={post.id} {...post} />
        ))}
        {feed.map((f) => (
          <Media key={f.id} {...f} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
