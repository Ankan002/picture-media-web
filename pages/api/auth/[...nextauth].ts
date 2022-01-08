import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { SIGN_IN } from "../../../graphql/mutations"
import { client } from "../../../graphql/configure"
import { createUserName } from "../../../hooks/createUserName"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    })
  ],
  pages: {
    signIn: '/auth/signin'
  },
  secret: "kjshgukashglkjhasjgkjhiurr",
  callbacks:{
    async signIn({ account, profile }) {

      const {provider} = account

      if (provider === 'google'){
        let username = createUserName(profile.email)

        const {data, errors} = await client.mutate({
          mutation: SIGN_IN,
          variables: {
            payload : {
              name: profile.name,
              username: username,
              email: profile.email,
              providerId: profile.sub,
              image: profile.picture,
            }
          }
        })

        if(errors) {
          console.log(errors)
          return false
        }

        return data.signIn.success
      }

      else if(provider === 'github'){
        const {data, errors} = await client.mutate({
          mutation: SIGN_IN,
          variables: {
            payload: {
              name: profile.name,
              username: profile.login,
              email: profile.email,
              providerId: profile.id,
              image: profile.avatar_url,
              githubProfile: profile.html_url
            }
          }
        })

        if(errors){
          console.log(errors)
          return false
        }

        return data.signIn.success
      }
    },
    async session({ session, token }) {
      if(token) session.accessToken = token.sub
      return session
    },
    async jwt({ token }) {
      return token
    }
  }
})