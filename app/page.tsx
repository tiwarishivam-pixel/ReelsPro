"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "./components/VideoFeed";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/api-client";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white shadow-md rounded-lg p-8 mb-8 mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          ImageKit ReelsPro
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Explore and manage high-quality video content seamlessly. Upload, watch, and monetize your videos with ease.
        </p>
      </section>

      {/* Video Feed */}
      <section className="max-w-6xl mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500 text-lg">Loading videos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500 text-lg">No videos available yet.</p>
          </div>
        ) : (
          <VideoFeed videos={videos} />
        )}
      </section>
    </main>
  );
}
