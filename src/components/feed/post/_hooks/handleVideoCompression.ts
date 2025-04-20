export const handleVideoCompression = async (
    file: File,
    maxSize: number = 4000000
  ) => {
    return new Promise<File>((resolve, reject) => {
      if (file.size <= maxSize) {
        resolve(file); // Skip compression if already under maxSize
      } else {
        const compressedFile = new File([file], file.name, { type: file.type });
        resolve(compressedFile);
      }
    });
  };
