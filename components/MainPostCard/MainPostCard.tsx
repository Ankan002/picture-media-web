import React from 'react'
import { useRecoilState } from 'recoil'
import { userProfile } from '../../atom/userProfileAtom'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import { useRouter } from 'next/router'

export type MainPostCardProps = {
    userId: string | number,
    photo: string | null,
    title: string | null,
    likes: string | number | null,
    liked_users: Array<string | number | null>
    userImage: string | null
}

const MainPostCard = (props: MainPostCardProps) => {

    const [user, setUser] = useRecoilState<any>(userProfile)
    const {userId, photo, title, likes, liked_users, userImage} =  props
    const router = useRouter()

    const onProfileClick = () => {
        router.push({
            pathname:'/user-profile',
            query:{
                userId: userId
            }
        })
    }

    return (
        <div className='p-5  w-full flex flex-col items-center'>
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
                            <button className='p-2 flex items-center justify-center'>
                                <AiFillHeart className='lg:text-2xl md:text-xl text-lg text-red-500' />
                            </button>
                        ) : (
                            <button className='p-2 flex items-center justify-center'>
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
