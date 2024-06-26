import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import NoResults from "./NoResults";
import React, { Dispatch, SetStateAction } from "react";
import { IUser } from "../types";

interface IComment {
  comment: string;
  length?: number; // optional property
  _key: string;
  postedBy: {
    _ref: string;
    _id: string;
  };
}

interface IProps {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
  isPostingComment: boolean;
}

function Comments({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-gray-200 border-b-2 pb-[100px] lg:pb-0">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          comments.map((comment, idx) => (
            <>
              {allUsers.map(
                (user: IUser) =>
                  user._id ===
                    (comment.postedBy._id || comment.postedBy._ref) && (
                    <div className="p-2 items-center" key={idx}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8">
                            <Image
                              src={user.image}
                              className="rounded-full"
                              width={34}
                              height={34}
                              alt="User profile"
                              layout="responsive"
                            />
                          </div>
                          <div className="hidden xl:block">
                            <p className="flex gap-1 items-center lowercase text-md font-bold text-primary">
                              {user.userName.replaceAll(" ", "")}{" "}
                              <GoVerified className="text-blue-400" />
                            </p>
                            <p className="capitalize text-gray-400 text-xs">
                              {user.userName}
                            </p>
                          </div>
                        </div>
                      </Link>

                      <div>
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text="no-comments" />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              placeholder="Add your comment..."
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button onClick={addComment} className="text-md text-gray-400">
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Comments;
