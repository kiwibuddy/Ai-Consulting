import { useState, useCallback } from "react";
import { apiRequest } from "@/lib/queryClient";

interface UploadResponse {
  objectPath: string;
  publicUrl?: string;
}

interface UseUploadOptions {
  onSuccess?: (response: UploadResponse) => void;
  onError?: (error: Error) => void;
}

export function useUpload(options: UseUploadOptions = {}) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = useCallback(
    async (file: File): Promise<UploadResponse | null> => {
      setIsUploading(true);
      setProgress(0);

      try {
        // Get signed upload URL from server
        const { uploadURL, objectPath } = await apiRequest("POST", "/api/uploads/request-url", {
          name: file.name,
          size: file.size,
          contentType: file.type,
        });

        // Upload file to object storage
        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            setProgress(Math.round((event.loaded / event.total) * 100));
          }
        });

        await new Promise<void>((resolve, reject) => {
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve();
            } else {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          };
          xhr.onerror = () => reject(new Error("Upload failed"));
          xhr.open("PUT", uploadURL);
          xhr.setRequestHeader("Content-Type", file.type);
          xhr.send(file);
        });

        const response: UploadResponse = { objectPath };
        options.onSuccess?.(response);
        return response;
      } catch (error) {
        const err = error instanceof Error ? error : new Error("Upload failed");
        options.onError?.(err);
        return null;
      } finally {
        setIsUploading(false);
        setProgress(0);
      }
    },
    [options]
  );

  return {
    uploadFile,
    isUploading,
    progress,
  };
}
