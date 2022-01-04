import React from 'react'
import { useRecoilState } from 'recoil'
import { userProfile } from '../../atom/userProfileAtom'
import { BsFillHeartFill } from 'react-icons/bs'

const ProfileDetail = () => {
    const [profile, setProfile] = useRecoilState<any>(userProfile)

    return (
        <div className='w-full flex lg:flex-row flex-col lg:items-center'>
            <div className='flex lg:m-10 md:m-8 mt-5 w-40 h-40 '>
                <img src={profile?.image} alt='' className='w-full h-full rounded-full' />
            </div>
            <div className='flex flex-col lg:mt-0 mt-5'>
                <div className='text-3xl font-bold font-serif text-red-500'>
                    {profile?.name}
                </div>
                <div className='text-sm'>
                    {profile?.username}
                </div>
                <div className='mt-3'>
                    {profile?.email}
                </div>
                <div className='flex items-center'>
                    <BsFillHeartFill className='text-red-500' />
                    <h1 className='ml-2'>{profile?.likes}</h1>
                </div>
                {
                    (profile?.githubProfile !== '') && (
                        <a href={profile?.githubProfile}>
                            <button
                                className='bg-red-500 w-16 h-10 rounded-lg text-white mt-3'
                            >
                                GitHub
                            </button>
                        </a>
                        
                    )
                }
                
            </div>
        </div>
    )
}

export default ProfileDetail
