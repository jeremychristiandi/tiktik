import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { topics } from "../utils/constants";

function Discover() {
  const router = useRouter();
  const { topic: queryTopic } = router.query;

  const activeTopicStyle =
    "xl:border-[#f51997] hover:bg-primary xl:border-2 text-[#f51997] px-3 py-2 rounded xl:rounded-full flex items-center justify-center gap-2 cursor-pointer";
  const topicStyle =
    "xl:border-2 hover:bg-primary xl:border-gray-300 text-black px-3 py-2 rounded xl:rounded-full flex items-center justify-center gap-2 cursor-pointer";

  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex flex-wrap gap-3">
        {topics.map((topic) => (
          <Link href={`/?topic=${topic.name}`} key={topic.name}>
            <div
              className={
                topic.name === queryTopic ? activeTopicStyle : topicStyle
              }
            >
              <span className="font-bold text-2xl xl:text-md">
                {topic.icon}
              </span>
              <span className="capitalize font-medium text-md hidden xl:block">
                {topic.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Discover;
