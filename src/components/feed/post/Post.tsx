"use client";
import React, { useRef, useState } from "react";
import { FaQuestionCircle, FaTimesCircle, FaEdit } from "react-icons/fa";
import styles from "../feed.module.sass";
import { postFeed } from "@/hooks";
import { useAppContext } from "@/context/AppProvider";
import { IFeedList } from "@/interface";
import {
  MediaButton,
  InfoBox,
  SelectedImagePreview,
  TextareaWithShortcuts,
} from "../_components";
import { handleFileChange, handleKeyDown, handleSubmit } from "./_hooks";

const Post = ({
  setNewPost,
}: {
  setNewPost: React.Dispatch<React.SetStateAction<IFeedList[]>>;
}) => {
  const [postContent, setPostContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { user } = useAppContext();
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [selectedVideos, setSelectedVideos] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleRemoveVideo = (index: number) => {
    const updatedVideos = [...selectedVideos];
    updatedVideos.splice(index, 1);
    setSelectedVideos(updatedVideos);
  };

  return (
    <div className={styles.post}>
      <div className={styles.uploadMedia}>
        {[
          {
            title: "Write a post",
            icon: "edit",
            onClick: () => textareaRef.current?.focus(),
          },
          {
            title: "Upload photos",
            icon: "gallery",
            onClick: () => {
              setEditingImageIndex(null);
              fileInputRef.current?.click();
            },
          },
          {
            title: "Upload video",
            icon: "video",
            onClick: () => {
              fileInputRef.current?.setAttribute("accept", "video/*");
              fileInputRef.current?.click();
            },
          },
        ].map((e) => (
          <MediaButton
            key={e.icon}
            title={e.title}
            icon={e.icon}
            onClick={e.onClick}
          />
        ))}
      </div>
      <form
        className={styles.formPost}
        onSubmit={(e) => {
          handleSubmit(
            e,
            postContent,
            setError,
            setLoading,
            setSelectedImages,
            selectedImages,
            setSelectedVideos,
            selectedVideos,
            user,
            setNewPost,
            setPostContent
          );
        }}
      >
        <TextareaWithShortcuts
          ref={textareaRef}
          value={postContent}
          onChange={(e: any) => setPostContent(e.target.value)}
          onKeyDown={(e: any) => {
            handleKeyDown(e, postContent, setPostContent);
          }}
          error={error}
        />
        <FaQuestionCircle
          className={styles.infoIcon}
          onClick={() => setShowInfo(!showInfo)}
        />
        {showInfo && <InfoBox />}
        {error && <span className={styles.error}>{error}</span>}
        <button type="submit" disabled={!postContent.trim()}>
          Post
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            handleFileChange(
              e,
              setSelectedImages,
              selectedImages,
              setSelectedVideos,
              selectedVideos
            );
          }}
          style={{ display: "none" }}
        />
      </form>
      {selectedImages.length > 0 && (
        <div className={styles.selectedImagesPreview}>
          {selectedImages.map((image, index) => (
            <div key={index} className={styles.imageContainer}>
              <SelectedImagePreview image={image} />
              <FaTimesCircle
                className={styles.removeIcon}
                onClick={() => handleRemoveImage(index)}
              />
              <FaEdit
                className={styles.changeIcon}
                onClick={() => {
                  setEditingImageIndex(index);
                  fileInputRef.current?.click();
                }}
              />
            </div>
          ))}
        </div>
      )}

      {selectedVideos.length > 0 && (
        <div className={styles.selectedImagesPreview}>
          {selectedVideos.map((video, index) => (
            <div key={index} className={styles.imageContainer}>
              <video
                src={URL.createObjectURL(video)}
                controls
                className={styles.videoPreview}
              />
              <FaTimesCircle
                className={styles.removeIcon}
                onClick={() => handleRemoveVideo(index)}
              />
              <FaEdit
                className={styles.changeIcon}
                onClick={() => {
                  setEditingImageIndex(index);
                  fileInputRef.current?.click();
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
