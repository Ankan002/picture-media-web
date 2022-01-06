import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../graphql/queries";
import { useRouter } from "next/router";
import CommonLoader from "../CommonLoader";
import { BsFillHeartFill } from "react-icons/bs";

const UserProfileDetail = () => {
  const [user, setUser] = useState<any>({});
  const [fetchUser, { data: profileData, error }] =
    useLazyQuery(GET_USER_BY_ID);
  const router = useRouter();
  const userId = router.query.userId;

  useEffect(() => {
    if (userId !== "" || userId !== undefined) {
      fetchUser({
        variables: {
          userId: userId,
        },
      });
    }
  }, [userId]);

  useEffect(() => {
    if (profileData?.userProfile?.success)
      setUser(profileData?.userProfile?.user);
  }, [profileData]);

  return (
    <div className="w-full">
      {Object.keys(user).length === 0 ? (
        <div className="h-96">
          <CommonLoader size={80} />
        </div>
      ) : (
        <div className="w-full flex lg:flex-row flex-col lg:items-center">
          <div className="flex lg:m-10 md:m-8 mt-5 w-40 h-40 ">
            <img
              src={user?.image}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="flex flex-col lg:mt-0 mt-5">
            <div className="text-3xl font-bold font-serif text-red-500">
              {user?.name}
            </div>
            <div className="text-sm">{user?.username}</div>
            <div className="mt-3">{user?.email}</div>
            <div className="flex items-center">
              <BsFillHeartFill className="text-red-500" />
              <h1 className="ml-2">{user?.likes}</h1>
            </div>
            {user?.githubProfile !== "" && (
              <a href={user?.githubProfile}>
                <button className="bg-red-500 w-16 h-10 rounded-lg text-white mt-3">
                  GitHub
                </button>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDetail;
