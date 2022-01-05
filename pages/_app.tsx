import React, {useEffect} from 'react';
import '../styles/globals.css';
import { SessionProvider, useSession } from "next-auth/react";
import { RecoilRoot } from 'recoil';
import {useRouter} from 'next/router'
import { ApolloProvider } from '@apollo/client';
import { client } from '../graphql/configure';
import { GET_USER, GET_ALL_POSTS, GET_POSTS_BY_USER } from '../graphql/queries';
import { useLazyQuery } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { userProfile } from '../atom/userProfileAtom';
import { allPostsData } from '../atom/allPostsDataAtom';
import { userPostsData } from '../atom/userPostsDataAtom';
import { allPostsLoading } from '../atom/allPostsLoadingAtom';
import { userPostsLoading } from '../atom/userPostsLoadingAtom';

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
  const [allPosts, setAllPosts] = useRecoilState(allPostsData)
  const [usersAllPosts, setUsersAllPosts] = useRecoilState(userPostsData)
  const [isAllPostsLoading, setIsAllPostsLoading] = useRecoilState(allPostsLoading)
  const [isUserPostsLoading, setIsUserPostsLoading] = useRecoilState(userPostsLoading)

  const [fetchUser, {data: result, loading, error}] = useLazyQuery(GET_USER)
  const [fetchAllPosts, {data: Posts, loading: postsLoading, error: postsError}] = useLazyQuery(GET_ALL_POSTS)
  const [fetchUsersAllPosts, {data: usersPosts, loading: usersPostsLoading, error: usersPostsError}] = useLazyQuery(GET_POSTS_BY_USER)

  useEffect(() => {
    console.log(status)
    if (status === 'unauthenticated') router.replace('/auth/signin')
    if (status === 'loading') return
    if (status === 'authenticated'){
      setIsAllPostsLoading(true)
      fetchUser({
        variables: {
          providerId: data.accessToken
        }
      })
      fetchAllPosts()
      setIsAllPostsLoading(false)
    }
  }, [status])

  useEffect(() => {
    setUser(result?.profile)
    
    if(result?.profile?.id){
      setIsUserPostsLoading(true)
      fetchUsersAllPosts({
        variables: {
          userId: result?.profile?.id
        }
      })
      setIsUserPostsLoading(false)
    }
  }, [result])

  useEffect(() => {
    if(Posts?.Posts?.success) setAllPosts(Posts?.Posts?.posts)
  }, [Posts])

  useEffect(() => {
    if(usersPosts?.userPosts?.success) setUsersAllPosts(usersPosts?.userPosts?.posts)
  }, [usersPosts])
  
  return children
}

export default MyApp
