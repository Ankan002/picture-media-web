import React from 'react'
import { useRouter } from 'next/router'
import {IoMdArrowRoundBack} from 'react-icons/io'

const CommonHeader = () => {

    const router = useRouter()

    const onBackClick = () => {
        router.back()
    }

    return (
        <div className='w-full flex justify-between items-center'>
            <button
                onClick={onBackClick}
            >
                <IoMdArrowRoundBack className='text-red-500 text-4xl' />
            </button>
        </div>
    )
}

export default CommonHeader
