import React from 'react'
import LoadingComponent from '../LoadingComponent'
import { useRecoilState } from 'recoil'
import { allPostsLoading } from '../../atom/allPostsLoadingAtom'
import { allPostsData } from '../../atom/allPostsDataAtom'
const emptyLogo = require('../../assets/empty.svg')

const HomeBody = () => {

    const [isAllPostsLoading, setIsAllPostsLoading] = useRecoilState(allPostsLoading)
    const [allPosts, setAllPosts] = useRecoilState(allPostsData)

    return (
        <div className='w-full flex-grow flex'>
            {
                isAllPostsLoading ? (
                    <div className='w-full flex-grow flex items-center justify-center'>
                        <LoadingComponent />
                    </div>
                ) : (
                    <>
                        {
                            (allPosts.length === 0) ? (
                                <div className='w-full flex-grow flex flex-col items-center justify-center'>
                                    <img src={emptyLogo.default.src} alt="" className='lg:w-80 lg:h-80 md:w-80 md:h-80 h-40 w-40' />
                                    <h1 className='lg:text-xl md:text-xl text-sm text-red-500 font-bold text-center'>
                                        Hold on while we fetch the data
                                    </h1>
                                </div>
                            ) : (
                                <div className='w-full flex-grow flex lg:px-8 md:px-6 px-5'>
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
