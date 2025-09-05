"use client";

import VideoUploadForm from "../components/VideoUploadForm";

export default function VideoUploadPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Upload New Reel
          </h1>
          <p className="text-gray-500 mb-6">
            Add your video details and upload your reel. Make sure your video meets the requirements.
          </p>
          <VideoUploadForm />
        </div>
      </div>
    </div>
  );
}
