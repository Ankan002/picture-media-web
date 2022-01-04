import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import HeadComponent from "../components/HeadComponent";
import { useRecoilState } from "recoil";
import { userProfile } from "../atom/userProfileAtom";
import LoadingComponent from "../components/LoadingComponent";
import Navbar from "../components/Navbar";
import { allPostsData } from "../atom/allPostsDataAtom";

const Home = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useRecoilState(userProfile);
  const [allPosts, setAllPosts] = useRecoilState(allPostsData)

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      {status === "loading" ? (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
          <HeadComponent title="Picture Media" />
          <LoadingComponent />
        </div>
      ) : (
        <div className="flex flex-col min-h-screen w-full">
          <HeadComponent title={"Picture Media"} />
          <Navbar profilePic={session?.user.image} />
        </div>
      )}
    </>
  );
};

export default Home;
