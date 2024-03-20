import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { MdFavorite } from "react-icons/md";

interface IProps {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}

function LikeButton({ handleLike, handleDislike, likes }: IProps) {
  const [hasLiked, setHasLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) setHasLiked(true);
    else setHasLiked(false);
  }, [filterLikes, likes]);

  return (
    <div className="flex gap-6">
      <div className="mt-6 flex flex-col items-center justify-center cursor-pointer">
        {hasLiked ? (
          <div
            onClick={handleDislike}
            className="bg-primary rounded-full p-2 md:p-4 text-[#f51997]"
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            onClick={handleLike}
            className="bg-primary rounded-full p-2 md:p-4"
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold">{likes?.length || 0}</p>
      </div>
    </div>
  );
}

export default LikeButton;
