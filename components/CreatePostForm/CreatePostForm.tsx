import React, { useState } from "react";
import {RiDeleteBin6Fill} from 'react-icons/ri'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilState } from "recoil";
import { userProfile } from "../../atom/userProfileAtom";
import { allPostsData } from "../../atom/allPostsDataAtom";
import { userPostsData } from "../../atom/userPostsDataAtom";
import axios from "axios";

const CreatePostForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileToUpload, setSelectedFileToUpload] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [postTitle, setPostTitle] = useState('')
  const [profile, setProfile] = useRecoilState<any>(userProfile)
  const [allPosts, setAllPosts] = useRecoilState(allPostsData)
  const [usersPosts, setUsersPosts] = useRecoilState(userPostsData)

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


  async function postImage({photo, title, id}: any) {
    const formData = new FormData()

    formData.append('photo', photo)
    formData.append('title', title)
    formData.append('id', id)

    const Response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_REST_API}/post/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    setSelectedFileToUpload(null)
    setSelectedFile(null)
    setPostTitle('')

    return Response.data
  }


  const createPost = async() => {
    if (isUploading) return

    setIsUploading(true)

    if(!selectedFileToUpload || selectedFileToUpload === null){
        notify('No image has been selected', true)
        setIsUploading(false)
        return
    }

    if(postTitle === ''){
        notify('There is no title for your post', true)
        setIsUploading(false)
        return
    }

    if(postTitle.trim().length > 50){
        notify('Post Title: Max 50 Characters allowed', true)
        setIsUploading(false)
        return
    }

    const response = await postImage({photo: selectedFileToUpload, title: postTitle, id: profile?.id})

    if (!response?.success){
      notify(response?.message, true)
      setIsUploading(false)
      return
    }

    const newUserPosts = [response?.post].concat(usersPosts)
    setUsersPosts(newUserPosts)

    const user = {
      id: profile?.id,
      username: profile?.username,
      image: profile?.image
    }

    console.log(response)

    const modifiedResponse = {...response?.post, user}

    const newAllPosts = [modifiedResponse].concat(allPosts)
    setAllPosts(newAllPosts)
    
    
    if(response?.success){
      notify('Post Created', false)
    }

    setIsUploading(false)
  }


  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0])
        setSelectedFileToUpload(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
        setSelectedFile(readerEvent.target.result)
    }
 }


  return (
    <div className="w-full flex flex-col items-center">
      <ToastContainer />
      <h1 className="mt-5 text-red-500 lg:text-4xl md:text-3xl text-2xl font-bold">
        Create A Post
      </h1>
      <label className="mt-5">Upload Image {"( jpg, png, svg, jpeg )"}</label>
      <div className="flex items-center  justify-center w-full mt-5">
        {selectedFile ? (
          <div className="w-96 h-96 object-contain">
            <img 
              src={selectedFile}
              className="w-96 h-96 object-contain"
            />
          </div>
          
        ) : (
          <label className="flex flex-col lg:w-1/2 w-full h-48 border-4 border-dashed border-red-400 hover:bg-red-50 hover:border-red-300  justify-center  rounded-xl">
            <div className="flex flex-col items-center justify-center pt-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-red-400 group-hover:text-red-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="pt-1 text-sm tracking-wider text-red-400 group-hover:text-red-600">
                Select a photo
              </p>
            </div>
            <input
              type="file"
              className="opacity-0"
              accept="image/*"
              onChange={addImageToPost}
            />
          </label>
        )}
      </div>
      {
          (selectedFile) && (
            <div className="lg:w-1/2 w-full mt-3 flex items-center justify-end">
                <button
                    className="mr-5"
                    onClick={() => {
                        setSelectedFile(null)
                        setSelectedFileToUpload(null)
                    }}
                >
                    <RiDeleteBin6Fill className="lg:text-2xl text-xl text-red-500" />
                </button>
            </div>
          )
      }
      
      <input
       type='text' 
       placeholder='Enter Title'
       className="lg:w-1/2 w-full my-3 p-2 border-red-400 border-2 rounded-3xl outline-none text-red-400 px-4 placeholder:text-red-300"
       onChange={(event) => setPostTitle(event.target.value)}
       value={postTitle} 
      />
      
      {
        isUploading ? (
          <button
           className="mt-4 bg-gray-200 lg:w-32 w-24 p-3 lg:text-xl text-sm text-red-400 rounded-full"
           onClick={createPost}
           type="submit"
          >
            Uploading...
          </button>
        ) : (
          <button
           className="mt-4 bg-red-400 lg:w-32 w-24 p-3 lg:text-xl text-sm text-white rounded-full"
           onClick={createPost}
           type="submit"
          >
            Post
          </button>
        ) 
      }
      
    </div>
  );
};

export default CreatePostForm;
