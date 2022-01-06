import React from 'react';
import LoadingComponent from '../components/LoadingComponent';
import {useSession} from 'next-auth/react'
import HeadComponent from '../components/HeadComponent';
import CommonHeader from '../components/CommonHeader';
import UserProfileDetail from '../components/UserProfileDetail';
import UserProfilePostsBody from '../components/UserProfilePostsBody';

const userProfile = () => {
    const {status} =  useSession()

    return(
        <>
        {
            (status === 'loading') ? (
                <div className="w-full min-h-screen flex flex-col items-center justify-center">
                    <HeadComponent title="User Profile" />
                    <LoadingComponent />
                </div>
            ) : (
                <div className="min-h-screen w-full flex flex-col lg:px-8 md:px-6 px-5 lg:pt-8 md:pt-6 pt-5">
                    <HeadComponent title="User Profile" />
                    <CommonHeader />
                    <UserProfileDetail />
                    <div className='w-full flex-grow'>
                        <UserProfilePostsBody />
                    </div>
                </div>
            )
        }
        </>
    )
}

export default userProfile
