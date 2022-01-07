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