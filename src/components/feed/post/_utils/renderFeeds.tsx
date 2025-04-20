import styles from "../../feed.module.sass";
import Image from "next/image";

export const renderFeeds = ({
  feeds,
}: {
  feeds: { url: string; type: "image" | "video" }[];
}) => {
  const API_FOR_MEDIA = "http://192.168.100.6:8080";

  if (!feeds || feeds.length === 0) return null;

  const visibleFeeds = feeds.slice(0, 4);
  const remainingCount = feeds.length - 4;

  const getMediaSrc = (url: string) =>
    url.includes("blob") ? url : `${API_FOR_MEDIA}${url}`;

  const renderMedia = (
    feed: { url: string; type: "image" | "video" },
    index: number,
    className: string
  ) => {
    const mediaSrc = getMediaSrc(feed.url);
    return feed.type === "video" ? (
      <video
        key={`video-${index}`}
        src={mediaSrc}
        className={className}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        controls
      />
    ) : (
      <Image
        key={`image-${index}`}
        src={mediaSrc}
        alt={`Feed ${index + 1}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        className={className}
        style={{ objectFit: "cover" }}
      />
    );
  };

  return (
    <div className={styles.mediaContainer}>
      {/* Render the first (large) media */}
      <div
        key="large-media"
        style={feeds.length === 1 ? { maxWidth: "100%" } : {}}
        className={styles.largeMedia}
      >
        {renderMedia(visibleFeeds[0], 0, styles.largeMedia)}
      </div>

      {/* Render the remaining (small) media */}
      {visibleFeeds.length > 1 && (
        <div className={styles.leftSide}>
          {visibleFeeds.slice(1).map((feed, index) => (
            <div key={`small-media-${index}`} className={styles.smallMedia}>
              {renderMedia(feed, index + 1, styles.smallMedia)}

              {/* Overlay for the last small media if there are remaining items */}
              {index === 2 && remainingCount > 0 && (
                <div className={styles.overlay}>
                  <span>+{remainingCount}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
