import React from 'react'
import LoadingComponent from '../LoadingComponent'
import { useRecoilState } from 'recoil'
import { allPostsData } from '../../atom/allPostsDataAtom'
const emptyLogo = require('../../assets/empty.svg')
import MainPostCard from '../MainPostCard'


const HomeBody = () => {

    const [posts, setPosts] = useRecoilState<any>(allPostsData)
    console.log(posts)

    return (
        <div className='w-full flex-grow flex'>
            {
                (posts === undefined || Object.keys(posts).length === 0) ? (
                    <div className='w-full flex-grow flex items-center justify-center'>
                        <LoadingComponent />
                    </div>
                ) : (
                    <>
                        {
                            (posts?.success && (posts?.posts).length === 0) ? (
                                <div className='w-full flex-grow flex flex-col items-center justify-center'>
                                    <img src={emptyLogo.default.src} alt="" className='lg:w-80 lg:h-80 md:w-80 md:h-80 h-40 w-40' />
                                    <h1 className='lg:text-xl md:text-xl text-sm text-red-500 font-bold text-center'>
                                        Its Quite Empty Here.... Post Something Now
                                    </h1>
                                </div>
                            ) : (
                                <div className='w-full lg:masonry-5-col md:masonry-3-col sm:masonry-2-col masonry-1-col lg:px-8 md:px-6 px-5'>
                                    {
                                        (posts?.posts).map((post: any) => (
                                            <div key={post?.id} className='w-full break-inside'>
                                            <MainPostCard 
                                                userId={post?.user?.id} 
                                                likes={post?.likes}
                                                photo={post?.photo}
                                                title={post?.title}
                                                liked_users={post?.liked_users}
                                                userImage={post?.user?.image} 
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

export default HomeBody
