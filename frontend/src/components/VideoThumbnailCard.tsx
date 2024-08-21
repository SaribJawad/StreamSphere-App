import React from "react";
import { Link } from "react-router-dom";
import { formateDuration } from "../utils/formatDuration";
import { formatViews } from "../utils/formatViews";
import { formatDate } from "../utils/formateDate";

interface Video {
  _id: string;
  createdAt: string;
  duration: number;
  owner: {
    _id: string;
    avatar: {
      _id: string;
      public_id: string;
      url: string;
    };
    subscribersCount: number;
    username: string;
  };
  thumbnail: {
    _id: string;
    public_id: string;
    url: string;
  };
  title: string;
  views: number;
}

interface VideoThumbnailCard {
  video: Video;
}

const VideoThumbnailCard: React.FC<VideoThumbnailCard> = ({ video }) => {
  const {
    thumbnail: { url: thumbnailUrl },
    title,
    duration,
    views,
    createdAt,
    owner: {
      username,
      avatar: { url: avatarUrl },
    },
  } = video;
  console.log();

  return (
    <div className=" h-[270px] w-[100%]">
      <div className=" h-[72%] relative rounded-xl overflow-hidden hover:rounded-none transition-all duration-300 ease-in-out ">
        <Link to={""}>
          <img
            className=" object-cover w-full h-full"
            src={thumbnailUrl}
            alt="video-thumbnail"
          />
          <span className="absolute bottom-2 text-sm bg-black bg-opacity-45 px-[5px] rounded-md right-2 z-5 text-center">
            {formateDuration(duration)}
          </span>
        </Link>
      </div>
      <div className="h-[28%]  flex items-center gap-2 p-2">
        <div className="w-[40px] h-[40px]   rounded-full overflow-hidden">
          <Link to={""} className="">
            <img
              className="h-full w-full  object-cover"
              src={avatarUrl}
              alt=""
            />
          </Link>
        </div>
        <div className="w-[81%] h-full  ">
          <Link to={""}>
            <h1 className=" text-sm mid-w-full truncate">{title}</h1>
            <h2 className="inline-block text-[13px] text-zinc-500 hover:text-white">
              {username}
            </h2>
            <h3 className="text-[12px] text-zinc-500 ">
              {formatViews(views)} views • {formatDate(createdAt)}
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoThumbnailCard;
