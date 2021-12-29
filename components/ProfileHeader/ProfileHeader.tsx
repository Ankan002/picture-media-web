import React from 'react'
import {IoMdArrowRoundBack} from 'react-icons/io'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { userProfile } from '../../atom/userProfileAtom'

const ProfileHeader = () => {

    const [profile, setProfile] = useRecoilState(userProfile)
    const router = useRouter()

    const onBackClick = () => {
        router.back()
    }

    const onSignOut = () => {
        setProfile({})
        signOut()
    }

    return (
        <div className='w-full flex justify-between items-center'>
            <button
                onClick={onBackClick}
            >
                <IoMdArrowRoundBack className='text-red-500 text-4xl' />
            </button>
            <button
                className='bg-red-500 p-2 rounded-lg text-white font-bold'
                onClick={onSignOut}
            >
                SignOut
            </button>
        </div>
    )
}

export default ProfileHeader
