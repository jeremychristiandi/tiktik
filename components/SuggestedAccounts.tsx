import React, { useEffect } from "react";
import useAuthStore from "../store/authStore";
import Link from "next/link";
import { IUser } from "../types";
import Image from "next/image";
import { GoVerified } from "react-icons/go";

function SuggestedAccounts() {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <p className="text-gray-500 font-semibold mt-4 m-3 hidden xl:block">
        Suggested Accounts
      </p>
      <div className="">
        {allUsers.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
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
        ))}
      </div>
    </div>
  );
}

export default SuggestedAccounts;
