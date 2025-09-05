"use client";

import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { useState } from "react";
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
}: FileUploadProps) {
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const onError = (err: { message: string }) => {
    setStatus("error");
    setError(err.message);
    setProgress(0);
  };

  const handleSuccess = (response: IKUploadResponse) => {
    setStatus("success");
    setError(null);
    setProgress(100);
    onSuccess(response);
  };

  const handleStartUpload = () => {
    setStatus("uploading");
    setError(null);
    setProgress(0);
  };

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable) {
      const percent = Math.round((evt.loaded / evt.total) * 100);
      setProgress(percent);

      // ✅ Fixed ESLint error by using if statement instead of short-circuit
      if (onProgress) {
        onProgress(percent);
      }
    }
  };

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) return setErrorAndFail("Invalid video file");
      if (file.size > 100 * 1024 * 1024) return setErrorAndFail("Video must be <100MB");
    } else {
      const valid = ["image/jpeg", "image/png", "image/webp"];
      if (!valid.includes(file.type)) return setErrorAndFail("Invalid image file");
      if (file.size > 5 * 1024 * 1024) return setErrorAndFail("Image must be <5MB");
    }
    return true;
  };

  const setErrorAndFail = (msg: string) => {
    setError(msg);
    setStatus("error");
    return false;
  };

  return (
    <div className="space-y-2">
      <IKUpload
        fileName={fileType}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadStart={handleStartUpload}
        onUploadProgress={handleProgress}
        accept={fileType === "video" ? "video/*" : "image/*"}
        className="w-full py-2 px-3 border border-gray-300 rounded cursor-pointer hover:border-blue-400 transition"
        validateFile={validateFile}
        useUniqueFileName
        folder={fileType === "video" ? "/videos" : "/images"}
      />

      {/* Status Messages */}
      {status === "uploading" && (
        <div className="flex items-center gap-2 text-blue-600 text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Uploading... {progress}%</span>
        </div>
      )}
      {status === "success" && (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <CheckCircle2 className="w-4 h-4" />
          <span>Upload complete!</span>
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
