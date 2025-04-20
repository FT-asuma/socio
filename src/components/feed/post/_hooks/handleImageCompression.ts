export const handleImageCompression = (file: File, maxSize: number = 300000) => {
    return new Promise<File>((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onloadend = () => {
        img.src = reader.result as string;
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject("Error getting canvas context.");

        // Resize image (optional)
        const maxWidth = 1000; // Max width for resizing (optional)
        const ratio = img.width / img.height;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          width = maxWidth;
          height = width / ratio;
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              if (blob.size <= maxSize) {
                resolve(new File([blob], file.name, { type: file.type }));
              } else {
                const compressedBlob = new Blob([blob], { type: "image/jpeg" });
                resolve(
                  new File([compressedBlob], file.name, { type: file.type })
                );
              }
            } else {
              reject("Failed to compress image.");
            }
          },
          "image/jpeg",
          0.7
        );
      };
    });
  };