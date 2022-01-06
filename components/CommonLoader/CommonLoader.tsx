import React from 'react'
import RingLoader from 'react-spinners/RingLoader'

export type CommonLoaderProps = {
    size: number
}

const CommonLoader = (props: CommonLoaderProps) => {

    const {size} = props

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <RingLoader 
                color='#F05454'
                size={size}
            />
        </div>
    )
}

export default CommonLoader
