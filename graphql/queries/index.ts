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