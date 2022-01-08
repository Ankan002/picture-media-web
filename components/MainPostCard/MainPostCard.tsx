import React, {useEffect} from 'react'
import { useRecoilState } from 'recoil'
import { userProfile } from '../../atom/userProfileAtom'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { LIKE_POST } from '../../graphql/mutations'
import { userPostsData } from '../../atom/userPostsDataAtom'
import { allPostsData } from '../../atom/allPostsDataAtom'
import toast, { Toaster } from 'react-hot-toast';

export type MainPostCardProps = {
    userId: string | number,
    photo: string | null,
    title: string | null,
    likes: string | number | null,
    liked_users: Array<string | number | null>
    userImage: string | null
    id: string | number | null
}

const MainPostCard = (props: MainPostCardProps) => {

    const [user, setUser] = useRecoilState<any>(userProfile)
    const {userId, photo, title, likes, liked_users, userImage, id} =  props
    const router = useRouter()
    const [likePost, {data: likeData}] = useMutation(LIKE_POST)
    const [allPosts, setAllPosts] = useRecoilState<any>(allPostsData)
    const [userPosts, setUserPosts] = useRecoilState<any>(userPostsData)

    const onProfileClick = () => {
        router.push({
            pathname:'/user-profile',
            query:{
                userId: userId
            }
        })
    }

    const onLikeClick = () => {
        likePost({
            variables: {
                payload: {
                    postId: id,
                    userId: user.id,
                    user: userId
                }
            }
        })
    }

    useEffect(() => {
        if(likeData?.likePost === undefined || Object.keys(likeData?.likePost).length === 0) return
        if(!(likeData?.likePost?.success)){
            toast.error('Like Failed')
            return
        }
        if(likeData?.likePost?.success){
            let tempAllPosts = (allPosts?.posts).map((post: any) => {
                if(post?.id !== likeData?.likePost?.post?.id) return post

                const newPost = {...post, likes: likeData?.likePost?.post?.likes, liked_users: likeData?.likePost?.post?.liked_users}

                return newPost
            })

            setAllPosts({...allPosts, posts: tempAllPosts})
            

            if(user?.id !== likeData?.likePost?.post?.user) return

            let tempUsersPosts = (userPosts?.posts).map((post: any) => {
                if(post?.id !== likeData?.likePost?.post?.id) return post

                const newPost = {...post, likes: likeData?.likePost?.post?.likes, liked_users: likeData?.likePost?.post?.liked_users}

                return newPost
            })

            setUserPosts({...userPosts, posts: tempUsersPosts})
            
        }
    }, [likeData])

    return (
        <div className='p-5  w-full flex flex-col items-center'>
            <Toaster />
            <div className='w-full flex flex-col items-center relative'>
                <img src={photo} className='rounded-3xl w-full object-contain block' />
                <div 
                    className='absolute top-0 bottom-0 w-full h-full opacity-0 hover:opacity-80 bg-black p-5 rounded-3xl flex justify-center items-center hover:cursor-pointer transition-all ease-in-out delay-100'
                >
                    <h1 className='text-white text-center lg:text-lg md:text-base text-sm font-semibold font-sans'>{title}</h1>
                </div>
            </div>
            <div 
                className='w-full flex justify-between'
            >
                <div className='flex items-center justify-center'>
                    <button className='p-2 flex items-center justify-center' onClick={onProfileClick}>
                        <img src={userImage} className='w-8 h-8 rounded-full' />
                    </button>
                </div>
                <div className='flex items-center'>
                    <>
                    {
                        (liked_users.includes(user?.id)) ? (
                            <button className='p-2 flex items-center justify-center' onClick={onLikeClick}>
                                <AiFillHeart className='lg:text-2xl md:text-xl text-lg text-red-500' />
                            </button>
                        ) : (
                            <button className='p-2 flex items-center justify-center' onClick={onLikeClick}>
                                <AiOutlineHeart className='lg:text-2xl md:text-xl text-lg text-red-500' />
                            </button>
                        )  
                    }
                    <p className='text-red-500 lg:text-xl md:text-lg text-lg py-2 pr-2 flex items-center justify-center'>
                        {likes}
                    </p>
                    </>
                </div>
            </div>
        </div>
    )
}

export default MainPostCard
