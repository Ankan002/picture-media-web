import { gql } from "@apollo/client";

export const GET_USER = gql`
    query ($providerId: ID!) {
        profile(providerId: $providerId){
            success
            id
            name
            username
            email
            providerId
            image
            githubProfile
            likes
        }
    }
`

export const GET_ALL_POSTS = gql`
    query{
        Posts{
            posts{
                id
                user{
                    id
                    username
                    image
                }
                photo
                title
                liked_users
                likes
            }
            success
        }
    }
`

export const GET_POSTS_BY_USER = gql`
    query($userId: ID!){
        userPosts(userId: $userId){
            posts{
                id
                user
                title
                photo
                likes
                liked_users
            }
            success
        }
    }
`