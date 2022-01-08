import Link from 'next/link';
import { useState } from 'react';
import {useRouter} from 'next/router';
const icon = require('../../assets/icon.svg')

const Navbar = ({profilePic}) => {
  const [active, setActive] = useState(false);
  const router = useRouter()
  console.log(icon)

  const handleClick = () => {
    setActive(!active);
  };

  const handleProfileClick = () => {
      router.push('/profile')
  }

  const handleCreatePostClick = () => {
    router.push('/create-post')
}

  return (
    <>
      <nav className='flex items-center flex-wrap p-3 bg-transparent'>
        <Link href='/'>
          <a className='inline-flex items-center p-2 mr-4 '>
            <img src={icon?.default?.src} className='w-8 h-8 mr-1' />
            <span className='text-xl text-red-500 font-bold uppercase tracking-wide'>
              Picture Media
            </span>
          </a>
        </Link>
        <button
          className=' inline-flex p-3 hover:bg-transparent rounded lg:hidden text-red-500 ml-auto hover:text-red-500 outline-none'
          onClick={handleClick}
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div
          className={`${
            active ? '' : 'hidden'
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'>
            <button onClick={handleCreatePostClick}>
              <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-red-500 font-bold items-center justify-center hover:bg-red-500 hover:text-white'>
                Create Post
              </a>
            </button>
            <button onClick={handleProfileClick}>
              <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-red-500 font-bold items-center justify-center hover:bg-transparent hover:text-red-500'>
                <img src={profilePic} alt="" className="w-10 rounded-full" />
              </a>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar
