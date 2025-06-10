import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
query Products {
    products {
        content {
            id
            name
            brand
            price
            description
            category
            imagePaths
            tags
            created
            updated
            variants {
                name
                value
                additionalPrice
            }
        }
    }
}
`