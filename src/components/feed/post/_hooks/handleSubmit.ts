import { postFeed } from "@/hooks";
import { IFeedList } from "@/interface";

export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  postContent: string,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>,
  selectedImages: File[],
  setSelectedVideos: React.Dispatch<React.SetStateAction<File[]>>,
  selectedVideos: File[],
  user: any,
  setNewPost: React.Dispatch<React.SetStateAction<IFeedList[]>>,
  setPostContent: React.Dispatch<React.SetStateAction<string>>
) => {
  e.preventDefault();
  if (!postContent.trim()) {
    setError("Post content cannot be empty.");
    return;
  }

  setLoading(true);
  try {
    const res = await postFeed({
      description: postContent.trim(),
      feeds: [...selectedImages, ...selectedVideos],
      userId: user._id,
    });

    if (res === "error") {
      setError("Failed to post feed.");
      setLoading(false);
      return;
    }

    // Update local state
    const imageUrls = selectedImages.map((img) => URL.createObjectURL(img));
    const videoUrls = selectedVideos.map((vid) => URL.createObjectURL(vid));

    setNewPost((prev) => [
      {
        createdAt: String(new Date()),
        description: postContent.trim(),
        id: String(Date.now()),
        feeds: {
            video: videoUrls,
            image: imageUrls
        },
        user,
      },
      ...prev,
    ]);

    // Reset state
    setPostContent("");
    setSelectedImages([]);
    setSelectedVideos([]);
  } catch (err) {
    console.error("Error while posting:", err);
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};
