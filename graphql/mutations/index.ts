import { gql } from "@apollo/client";

export const SIGN_IN = gql`
    mutation ($payload: AuthInput){
        signIn(payload: $payload){
            success
        }
    }
`

export const DELETE_POST = gql`
    mutation($post: PostInput!){
        deletePost(post: $post) {
            message
            postId
            success
        }
    }
`

export const LIKE_POST = gql`
    mutation($payload: LikeInput!){
        likePost(payload: $payload) {
          post {
            id
            liked_users
            likes
            user
            photo
            title
          }
          success
        }
    }
`