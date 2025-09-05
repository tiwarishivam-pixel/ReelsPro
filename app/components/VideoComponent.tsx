import { IKVideo } from "imagekitio-next";
import Link from "next/link";
import { IVideo } from "@/models/Video";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Video Preview */}
      <Link href={`/videos/${video._id}`} className="block relative group w-full">
        <div
          className="relative w-full overflow-hidden rounded-t-xl"
          style={{ aspectRatio: "9/16" }}
        >
          <IKVideo
            path={video.videoUrl}
            transformation={[
              { height: "1920", width: "1080" }
            ]}
            controls={video.controls}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-4">
        <Link
          href={`/videos/${video._id}`}
          className="hover:text-blue-600 transition-colors"
        >
          <h2 className="text-lg font-semibold line-clamp-2">{video.title}</h2>
        </Link>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}
