import React, { useEffect, useMemo, useState } from "react";
import styles from "../feed.module.sass";
import Image from "next/image";
import Link from "next/link";
import { IFeedList } from "@/interface";
import { v4 as uuidv4 } from "uuid";
import { renderFeeds } from "./_utils/renderFeeds";

const Media = ({ description, id, feeds, user }: IFeedList) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const maxLength = 300;
  const applyFormatting = (text: string): React.ReactNode => {
    const boldItalicRegex = /\*\*\*(\S(?:.*\S)?)\*\*\*/g;
    const boldRegex = /\*\*(\S(?:.*\S)?)\*\*/g;
    const italicRegex = /\*(\S(?:.*\S)?)\*/g;

    let formattedText = text.replace(
      boldItalicRegex,
      (_, content) => `<strong><em>${content}</em></strong>`
    );

    formattedText = formattedText.replace(
      boldRegex,
      (_, content) => `<strong>${content}</strong>`
    );

    formattedText = formattedText.replace(
      italicRegex,
      (_, content) => `<em>${content}</em>`
    );

    return <span dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  const renderBlog = (blog: string) => {
    const lines = blog.split("\n");
    const renderedContent = useMemo(() => {
      const content = lines.filter((e) => e.trim() !== "");
      return content.map((line) => {
        const key = uuidv4();
        return <p key={key}>{applyFormatting(line)}</p>;
      });
    }, [blog]);

    return renderedContent;
  };

  const truncatedDescription = description.slice(0, maxLength);

  return (
    <div className={styles.mediaFeed}>
      <div className={styles.user}>
        <Image
          src={user.image || "/images/user-image.png"}
          alt="user image"
          width={140}
          height={140}
        />
        <div className={styles.details}>
          <div className={styles.top}>
            <h2>{user.name}</h2>
            <Link href={`/users/@${user.username}`}>@{user.username}</Link>
          </div>
          <div className={styles.bottom}>
            <h3>{user.subtitle}</h3>
          </div>
        </div>
      </div>
      <div className={styles.postDetails}>
        {description.length > maxLength && !showFullDescription
          ? renderBlog(truncatedDescription)
          : renderBlog(description)}
        {description.length > maxLength && (
          <button
            className={styles.readMoreButton}
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "Show Less" : "Read More"}
          </button>
        )}
        {renderFeeds({ feeds })}
      </div>
    </div>
  );
};

export default Media;
