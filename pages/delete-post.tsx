import React, {useEffect, useState} from 'react';
import {TiTick} from 'react-icons/ti'
import {ImCross} from 'react-icons/im'
import { useRouter } from 'next/router';
import HeadComponent from '../components/HeadComponent';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../graphql/mutations';
import { ToastContainer, toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { allPostsData } from '../atom/allPostsDataAtom';
import { userPostsData } from '../atom/userPostsDataAtom';
import {BiLoader} from 'react-icons/bi'


const deletePost = () => {

    const router = useRouter()
    const postId = router.query.postId
    const link = router.query.link
    const [allPosts, setAllPosts] = useRecoilState<any>(allPostsData)
    const [userPosts, setUserPosts] = useRecoilState<any>(userPostsData)
    const [deletePosts, {data: deletedData}] = useMutation(DELETE_POST)
    const [isDeleting, setIsDeleting] = useState(false) 

    const notify = (message: string, error: boolean) => {
        if(error){
          toast.error(message, {
            autoClose: 2000
          })
        }
        else{
          toast.success(message, {
            autoClose: 2000
          })
        }
    }

    const onTickClick = () => {
        if(isDeleting) return
        setIsDeleting(true)
        deletePosts({
            variables: {
                post: {
                    postId,
                    link
                }
            }
        })
    }

    useEffect(() => {
        if(deletedData?.deletePost?.success === false){
            notify("Some Error Occurred", true)
            setIsDeleting(false)
        }
        else if(deletedData?.deletePost?.success === true){
            const newAllPosts = (allPosts.posts).filter((post: any) => post.id !== deletedData?.deletePost?.postId)
            setAllPosts({...allPosts, posts: newAllPosts})

            const newUserPosts = (userPosts.posts).filter((post: any) => post.id !== deletedData?.deletePost?.postId)
            setUserPosts({...userPosts, posts: newUserPosts})

            setIsDeleting(false)
            router.back()
        }
    }, [deletedData])

    const onCrossClick = () => {
        router.back()
    } 

    return(
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <HeadComponent title='Confirm Deletion'/>
            <ToastContainer />
            <h1 className='text-center lg:text-3xl md:text-2xl text-lg font-bold text-red-500'>
                Are you sure you want to delete?
            </h1>
            <div className='flex justify-center items-center w-full'>
                <button className='m-3' onClick={onCrossClick}>
                    <ImCross size={20} className='text-red-500' />
                </button>
                <button className='m-3' onClick={onTickClick}>
                    {
                        (isDeleting) ? (
                            <BiLoader size={35} className='text-red-500' />
                        ): (
                            <TiTick size={35} className='text-red-500' />
                        )
                    }
                </button>
            </div>
        </div>
    )
}

export default deletePost
