import { Ifeed } from "@/interface";
import axios from "axios";

export const postFeed = async (feed: Ifeed) => {
  const { description, feeds, userId } = feed;

  const processedFeeds = feeds
    ? await Promise.all(
        feeds.map((file) =>
          file.type.startsWith("image/")
            ? resizeAndConvertToBase64(file)
            : resizeAndCompressVideo(file)
        )
      )
    : [];

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/feeds`, {
      description,
      feeds: processedFeeds,
      userId,
    });
    if (res.status === 404) {
      return "error";
    }
  } catch (error) {
    console.error("Error posting feed:", error);
  }
};

// Resize and convert image to Base64
const resizeAndConvertToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onloadend = () => {
      img.src = reader.result as string;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);

    img.onload = () => {
      const maxWidth = 720;
      const scaleFactor = maxWidth / img.width;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        canvas.width = maxWidth;
        canvas.height = img.height * scaleFactor;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const resizedBase64 = canvas.toDataURL("image/jpeg", 0.8);

        const sizeInKB = (resizedBase64.length * 3) / 4 / 1024;
        if (sizeInKB <= 500) {
          resolve(resizedBase64);
        } else {
          reject("Image size exceeds 0.5MB");
        }
      } else {
        reject("Canvas context not found");
      }
    };
  });
};

// Resize and compress video
const resizeAndCompressVideo = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const reader = new FileReader();
    reader.onloadend = () => {
      video.src = reader.result as string;
      video.load();
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);

    video.onloadedmetadata = () => {
      const maxWidth = 720;
      const scaleFactor = maxWidth / video.videoWidth;

      canvas.width = maxWidth;
      canvas.height = video.videoHeight * scaleFactor;

      video.currentTime = 0;
    };

    video.onseeked = () => {
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const sizeInKB = blob.size / 1024;
              if (sizeInKB <= 5000) {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
              } else {
                reject("Video size exceeds 0.5MB");
              }
            } else {
              reject("Failed to compress video");
            }
          },
          "video/webm",
          0.8
        );
      } else {
        reject("Canvas context not found");
      }
    };

    video.onerror = reject;
    video.currentTime = 0; // Seek to start
  });
};
