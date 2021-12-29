import { getProviders, signIn, useSession } from "next-auth/react";
import HeadComponent from '../../components/HeadComponent';
import {BsGoogle, BsGithub} from 'react-icons/bs';
import {useRouter} from "next/router";
const signInLogo = require('../../assets/sign-in-image.svg')

function signin({ providers }) {

  const router = useRouter()
  const {data: session, status} = useSession()

  if(session) router.replace('/')

  return (
    <>
      <HeadComponent title={'Login'} />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center">
        <img src={signInLogo.default.src} alt="" className="w-80 h-80" />
        <p className="font-sm italic text-[#F05454]">
          Lets Login to the World Of Images with...
        </p>
        <div className="mt-10 flex">
          {Object.values(providers).map((provider: any) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-[#F05454] rounded-lg text-white my-3 mx-5"
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: "/",
                  })
                }
              >
                {
                    (provider.name === 'Google') && (
                        <BsGoogle className='h-5 w-10' />
                    )
                }
                {
                    (provider.name === 'GitHub') && (
                        <BsGithub className='h-5 w-10' />
                    )
                }
                
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

//Server Side Render
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signin;
