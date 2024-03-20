import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../utils";
import { IUser, Video } from "../../types";
import { useRouter } from "next/router";
import NoResults from "../../components/NoResults";
import VideoCard from "../../components/VideoCard";
import useAuthStore from "../../store/authStore";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

function Search({ videos }: { videos: Video[] }) {
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const [isAccountsSelected, setIsAccountsSelected] = useState(true);
  const accountsActive = isAccountsSelected
    ? "border-b-2 border-black"
    : "text-gray-400";
  const videosActive = !isAccountsSelected
    ? "border-b-2 border-black"
    : "text-gray-400";

  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-2 border-b-2 border-gray-200 bg-white w-full">
        <p
          onClick={() => setIsAccountsSelected(true)}
          className={`text-xl font-semibold cursor-pointer mt-2 py-2 ${accountsActive}`}
        >
          Accounts
        </p>
        <p
          onClick={() => setIsAccountsSelected(false)}
          className={`text-xl font-semibold cursor-pointer mt-2 py-2 ${videosActive}`}
        >
          Videos
        </p>
      </div>
      {isAccountsSelected ? (
        <div className="md:mt-6">
          {searchedAccounts.length ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link href={`/profile/${user._id}`} key={idx}>
                <div className="flex gap-3 cursor-pointer font-semibold rounded">
                  <div>
                    <Image
                      src={user.image}
                      className="rounded-full"
                      width={50}
                      height={50}
                      alt="User profile"
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
            ))
          ) : (
            <NoResults text={`No results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-6 flex flex-wrap gap-6">
          {videos.length ? (
            videos.map((video: Video, idx: number) => (
              <VideoCard post={video} key={idx} />
            ))
          ) : (
            <NoResults text={`No results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
}

export default Search;

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};
