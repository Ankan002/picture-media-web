import { gql } from "@apollo/client";

export const SIGN_IN = gql`
    mutation ($payload: AuthInput){
        signIn(payload: $payload){
            success
        }
    }
`