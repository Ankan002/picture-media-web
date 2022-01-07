import React from 'react'
import LoadingComponent from '../LoadingComponent'
import { useRecoilState } from 'recoil'
import { userPostsData } from '../../atom/userPostsDataAtom'
import ProfilePostCard from '../ProfilePostCard'
const emptyLogo = require('../../assets/empty.svg')



const ProfilePostsBody = () => {
    const [userPosts, setUserPosts] = useRecoilState<any>(userPostsData)

    return (
        <div className='w-full flex-grow flex'>
            {
                (userPosts === undefined || Object.keys(userPosts).length === 0) ? (
                    <div className='w-full flex-grow flex items-center justify-center'>
                        <LoadingComponent />
                    </div>
                ) : (
                    <>
                    {
                        (userPosts?.success && (userPosts?.posts).length === 0) ? (
                            <div className='w-full flex-grow flex flex-col items-center justify-center'>
                                <img src={emptyLogo.default.src} alt="" className='lg:w-80 lg:h-80 md:w-80 md:h-80 h-40 w-40' />
                                <h1 className='lg:text-xl md:text-xl text-sm text-red-500 font-bold text-center'>
                                    Post Something To See Here
                                </h1>
                            </div>
                        ): (
                            <div className='w-full lg:masonry-5-col md:masonry-3-col sm:masonry-2-col masonry-1-col'>
                                {
                                    (userPosts.posts).map((userPost: any) => (
                                        <div key={userPost?.id} className='w-full break-inside'>
                                            <ProfilePostCard 
                                                userId={userPost?.user} 
                                                likes={userPost?.likes}
                                                photo={userPost?.photo}
                                                title={userPost?.title}
                                                liked_users={userPost?.liked_users}
                                                id={userPost?.id} 
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
