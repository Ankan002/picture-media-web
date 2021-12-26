import React, {useEffect} from 'react';
import '../styles/globals.css';
import { SessionProvider, useSession } from "next-auth/react";
import { RecoilRoot } from 'recoil';
import {useRouter} from 'next/router'
import { ApolloProvider } from '@apollo/client';
import { client } from '../graphql/configure';
import { GET_USER } from '../graphql/queries';
import { useLazyQuery } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { userProfile } from '../atom/userProfileAtom';

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <RecoilRoot>
          <GetProfile>
            <Component {...pageProps} />
          </GetProfile>
        </RecoilRoot>
      </ApolloProvider>
    </SessionProvider>
  )
}

const GetProfile = ({children}) => {
  const {data, status} = useSession()
  const isUser = !!data?.user
  const router = useRouter()
  const [user, setUser] = useRecoilState(userProfile)

  const [fetchUser, {data: result, loading, error}] = useLazyQuery(GET_USER)

  useEffect(() => {
    console.log(status)
    if (status === 'unauthenticated') router.replace('/auth/signin')
    if (status === 'loading') return
    if (status === 'authenticated'){
      fetchUser({
        variables: {
          providerId: data.accessToken
        }
      })
    }
  }, [status])

  useEffect(() => {
    setUser(result)
  }, [result])
  
  return children
}

export default MyApp
