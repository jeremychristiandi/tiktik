import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { SanityAssetDocument } from "@sanity/client";

import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { topics } from "../utils/constants";
import { BASE_URL } from "../utils";

function Upload() {
  const [isLoading, setIsLoading] = useState(false);
  const [wrongFileType, setWrongFileType] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);
  const [error, setError] = useState("");

  const { userProfile }: { userProfile: any } = useAuthStore();
  const router = useRouter();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm,", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);

      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };

      await axios.post(`${BASE_URL}/api/post`, document);
      router.push("/");
    }
  };

  return (
    <div className="flex absolute w-full h-full left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#f8f8f8] justify-center">
      <div className="bg-white rounded-lg xl:h-[80vh] w-[70%] flex flex-wrap gap-6 justify-between items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-md text-gray-400 mt-1">
              Post a video to your account
            </p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[380px] p-10 cursor-pointer hover:border-red-300">
            {isLoading ? (
              <p>Uploading video...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      className="rounded-xl h-[450px] mt-16 bg-black"
                      loop
                      controls
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">Upload video</p>
                      </div>
                      <p className="text-center text-gray-400 text-sm mt-10 leading-6">
                        MP4 or WebM or og <br />
                        720x1280 or higher <br />
                        Up to 10 mins <br />
                        Less then 2GB
                      </p>
                      <p className="bg-[#f51997] text-center mt-10 rounded text-white text-md font-medium outline-none w-52 p-2">
                        Select video
                      </p>
                    </div>
                    <input
                      onChange={uploadVideo}
                      type="file"
                      name="upload-video"
                      className="w-0 h-0"
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="text-xl text-center text-red-400 font-semibold mt-4 w-[250px]">
                Please add a video file type
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium">Caption</label>
          <input
            onChange={(e) => setCaption(e.target.value)}
            className="rounded outline-none text-md border-2 border-gray-200 p-2"
            type="text"
            value={caption}
          />
          <label className="text-md font-medium">Choose a category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
          >
            {topics.map((topic) => (
              <option
                className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                key={topic.name}
                value={topic.name}
              >
                {topic.name}
              </option>
            ))}
          </select>

          <div className="flex gap-6 mt-10">
            <button
              onClick={() => {}}
              type="button"
              className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              type="button"
              className="bg-[#f51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
