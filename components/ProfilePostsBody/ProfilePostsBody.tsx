import React from 'react'
import LoadingComponent from '../LoadingComponent'
import { useRecoilState } from 'recoil'
import { userPostsLoading } from '../../atom/userPostsLoadingAtom'
import { userPostsData } from '../../atom/userPostsDataAtom'
import ProfilePostCard from '../ProfilePostCard'
const emptyLogo = require('../../assets/empty.svg')

const ProfilePostsBody = () => {

    const [isUserPostsLoading, setIsUserPostsLoading] = useRecoilState(userPostsLoading)
    const [userPosts, setUserPosts] = useRecoilState(userPostsData)
    console.log(userPosts)

    // {
    //     id: "61d440dd80520109ccc6134c"
    //     liked_users: []
    //     likes: 0
    //     photo: "http://res.cloudinary.com/exponents/image/upload/v1641300190/q0hazrfuxrxxqgixwvih.png"
    //     title: "My React Native Certification"
    //     user: "61c845d3fe10e5288eb9d4cd"
    // }

    return (
        <div className='w-full flex-grow flex'>
            {
                isUserPostsLoading ? (
                    <div className='w-full flex-grow'>
                        <LoadingComponent />
                    </div>
                ) : (
                    <>
                    {
                        (userPosts.length === 0) ? (
                            <div className='w-full flex-grow flex flex-col items-center justify-center'>
                                <img src={emptyLogo.default.src} alt="" className='lg:w-80 lg:h-80 md:w-80 md:h-80 h-40 w-40' />
                                <h1 className='lg:text-xl md:text-xl text-sm text-red-500 font-bold text-center'>
                                    Waiting for you to upload something
                                </h1>
                            </div>
                        ): (
                            <div className='w-full flex-grow flex flex-wrap'>
                                {
                                    userPosts.map(userPost => (
                                        <div key={userPost?.id} className='lg:w-1/4 md:w-1/2 w-full'>
                                            <ProfilePostCard 
                                                userId={userPost?.user} 
                                                likes={userPost?.likes}
                                                photo={userPost?.photo}
                                                title={userPost?.title}
                                                liked_users={userPost?.liked_users} 
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                    </>
                )
            }            
        </div>
    )
}

export default ProfilePostsBody
