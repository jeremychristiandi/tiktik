import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BASE_URL } from "../../utils";
import { Video } from "../../types";
import { useEffect, useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import LikeButton from "../../components/LikeButton";
import Comments from "../../components/Comments";

interface IProps {
  postDetails: Video;
}

function Detail({ postDetails }: IProps) {
  const [post, setPost] = useState(postDetails);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const { userProfile }: any = useAuthStore();

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });

      setPost({ ...post, likes: res.data.likes });
    }
  };

  const addComment = async (e) => {
    e.preventDefault();

    if (userProfile && comment) {
      setIsPostingComment(true);

      const response = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });

      setPost({
        ...post,
        comments: response.data.comments,
      });
      setComment("");
      setIsPostingComment(false);
    }
  };

  useEffect(() => {
    if (post && videoRef?.current) videoRef.current.muted = isMuted;
  }, [post, isMuted]);

  if (!post) return null;

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex items-center justify-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p onClick={() => router.back()} className="cursor-pointer">
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              ref={videoRef}
              onClick={onVideoClick}
              className="h-full cursor-pointer"
              src={post.video.asset.url}
              loop
            ></video>
          </div>
          <div className="absolute top-[40%] left-[40%] cursor-pointer">
            {!isPlaying && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>

        <div className="absolute bottom-5 right-5 lg:bottom-8 lg:right-8 cursor-pointer">
          {isMuted ? (
            <button onClick={() => setIsMuted(false)}>
              <HiVolumeUp className="text-white text-2xl lg:text-3xl" />
            </button>
          ) : (
            <button onClick={() => setIsMuted(true)}>
              <HiVolumeOff className="text-white text-2xl lg:text-3xl" />
            </button>
          )}
        </div>
      </div>

      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-20 mt-10">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="md:w-20 md:h-20 w-16 h-16 ml-4">
              <Link href="/">
                <>
                  <Image
                    width={62}
                    height={62}
                    className="rounded-full"
                    src={post.postedBy.image}
                    alt="Profile img"
                    layout="responsive"
                  />
                </>
              </Link>
            </div>
            <Link href="/">
              <div className="flex flex-col gap-2 mt-3">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName}{" "}
                  <GoVerified className="text-bold-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>

        <p className="px-10 text-lg text-gray-600">{post.caption}</p>
        <div className="mt-10 px-10">
          {userProfile && (
            <LikeButton
              handleLike={() => handleLike(true)}
              handleDislike={() => handleLike(false)}
              likes={post.likes}
            />
          )}
        </div>
        <Comments
          comment={comment}
          setComment={setComment}
          addComment={addComment}
          comments={post.comments}
          isPostingComment={isPostingComment}
        />
      </div>
    </div>
  );
}

export default Detail;

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: {
      postDetails: data,
    },
  };
};
