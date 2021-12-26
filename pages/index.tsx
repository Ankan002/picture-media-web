import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import HeadComponent from "../components/HeadComponent";
import { useRecoilState } from "recoil";
import { userProfile } from "../atom/userProfileAtom";
import LoadingComponent from "../components/LoadingComponent";

const Home = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useRecoilState(userProfile);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      {status === "loading" ? (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
          <HeadComponent title="Picture Media" />
          <LoadingComponent />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <HeadComponent title={"Picture Media"} />
          <button
            onClick={() => {
              signOut();
              setUser({});
            }}
          >
            SignOUT
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
