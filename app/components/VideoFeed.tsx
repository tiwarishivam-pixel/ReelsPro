import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";

interface VideoFeedProps {
  videos: IVideo[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.length > 0 ? (
        videos.map((video) => (
          <VideoComponent key={video._id?.toString()} video={video} />
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-24 text-center text-gray-500">
          <p className="text-lg font-medium mb-2">No videos available</p>
          <p className="text-sm">Upload new videos to see them here!</p>
        </div>
      )}
    </div>
  );
}
