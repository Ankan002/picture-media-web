import React, {useState, useEffect} from 'react'
import { GET_POSTS_BY_USER } from '../../graphql/queries'
import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import LoadingComponent from '../LoadingComponent'
const emptyLogo = require('../../assets/empty.svg')
import UserProfilePostCard from '../UserProfilePostCard'

const UserProfilePostsBody = () => {

    const [userPosts, setUserPosts] = useState<any>({})
    const [getPosts, {data: postData, error}] = useLazyQuery(GET_POSTS_BY_USER)
    const router = useRouter()
    const userId = router.query.userId 

    useEffect(() => {
        getPosts({
            variables: {
                userId: userId
            }
        })
    }, [userId])

    //.posts

    useEffect(() => {
        if(postData?.userPosts?.success) setUserPosts(postData?.userPosts)
    }, [postData])

    return (
        <div className='w-full flex-grow flex'>
            {
                (Object.keys(userPosts).length === 0) ? (
                    <div className='w-full flex-grow flex justify-center items-center'>
                        <LoadingComponent />
                    </div>
                ) : (
                    <>
                        {
                            (userPosts?.success && (userPosts?.posts).length === 0) ? (
                                <div className='w-full flex-grow flex flex-col items-center justify-center'>
                                    <img src={emptyLogo.default.src} alt="" className='lg:w-80 lg:h-80 md:w-80 md:h-80  h-40 w-40' />
                                    <h1 className='lg:text-xl md:text-xl text-sm text-red-500 font-bold text-center'>
                                        Post Something To See Here
                                    </h1>
                                </div>
                            ) : (
                                <div className='w-full lg:masonry-5-col md:masonry-3-col sm:masonry-2-col masonry-1-col'>
                                {
                                    (userPosts?.posts).map((userPost: any) => (
                                        <div key={userPost?.id} className='w-full break-inside'>
                                            <UserProfilePostCard  
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

export default UserProfilePostsBody
