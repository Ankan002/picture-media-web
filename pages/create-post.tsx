import React from "react";
import { useSession } from "next-auth/react";
import HeadComponent from "../components/HeadComponent";
import LoadingComponent from "../components/LoadingComponent";
import CommonHeader from "../components/CommonHeader";
import CreatePostForm from "../components/CreatePostForm";

const CreatePost = ()  => {

    const {status} = useSession()

    return(
        <>
            {
                (status === 'loading') ? (
                    <div className="w-full min-h-screen flex flex-col items-center justify-center">
                      <HeadComponent title="Create Post" />
                      <LoadingComponent />
                    </div>
                ) : (
                    <div className="min-h-screen w-full flex flex-col lg:px-8 md:px-6 px-5 lg:pt-8 md:pt-6 pt-5">
                        <HeadComponent title="Create Post" />
                        <CommonHeader />
                        <CreatePostForm />
                    </div>
                )
            }
            
        </>
    )
}

export default CreatePost