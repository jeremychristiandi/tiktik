import Image from "next/image";
import axios from "axios";
import { GoVerified } from "react-icons/go";

import NoResults from "../../components/NoResults";
import VideoCard from "../../components/VideoCard";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";
import { useEffect, useState } from "react";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

function Profile({ data }: IProps) {
  const { user, userVideos, userLikedVideos } = data;

  const [isVideosSelected, setIsVideosSelected] = useState(true);
  const [videosList, setVideosList] = useState<Video[]>([]);

  useEffect(() => {
    isVideosSelected
      ? setVideosList(userVideos)
      : setVideosList(userLikedVideos);
  }, [isVideosSelected, userVideos, userLikedVideos]);

  const videosActive = isVideosSelected
    ? "border-b-2 border-black"
    : "text-gray-400";
  const likesActive = !isVideosSelected
    ? "border-b-2 border-black"
    : "text-gray-400";

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-28 lg:h-28">
          <Image
            src={user.image}
            className="rounded-full"
            width={80}
            height={80}
            alt="User profile"
            layout="responsive"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="flex gap-1 items-center lowercase text-md md:text-xl tracking-wider font-bold text-primary">
            {user.userName.replaceAll(" ", "")}{" "}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="capitalize text-gray-400 text-xs md:text-l">
            {user.userName}
          </p>
        </div>
      </div>

      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            onClick={() => setIsVideosSelected(true)}
            className={`text-xl font-semibold cursor-pointer mt-2 py-2 ${videosActive}`}
          >
            Videos
          </p>
          <p
            onClick={() => setIsVideosSelected(false)}
            className={`text-xl font-semibold cursor-pointer mt-2 py-2 ${likesActive}`}
          >
            Likes
          </p>
        </div>

        <div className="flex flex-wrap md:justify-start">
          {videosList.length ? (
            videosList.map((post: Video, idx: number) => (
              <VideoCard post={post} key={idx} />
            ))
          ) : (
            <NoResults text="no-videos" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
};
