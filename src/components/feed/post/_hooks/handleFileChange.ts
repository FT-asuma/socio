import { handleImageCompression } from "./handleImageCompression";
import { handleVideoCompression } from "./handleVideoCompression";

export const handleFileChange = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>,
  selectedImages: File[],
  setSelectedVideos: React.Dispatch<React.SetStateAction<File[]>>,
  selectedVideos: File[]
) => {
  const files = e.target.files;
  if (files) {
    const newFiles = Array.from(files);
    const newImages = newFiles.filter((file) => file.type.startsWith("image/"));
    const newVideos = newFiles.filter((file) => file.type.startsWith("video/"));

    if (newImages.length > 0) {
      const compressedImages = await Promise.all(
        newImages.map((img) => handleImageCompression(img))
      );
      setSelectedImages([...selectedImages, ...compressedImages]);
    }

    if (newVideos.length > 0) {
      const compressedVideos = await Promise.all(
        newVideos.map((video) => handleVideoCompression(video))
      );
      setSelectedVideos([...selectedVideos, ...compressedVideos]);
    }
  }
};
