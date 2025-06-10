import { gql } from "@apollo/client";

export const GET_INVENTORYS = gql`
query Inventorys {
    inventorys {
        total
        page
        size
        content {
            id
            version
            skuCode
            quantity
            unitPrice
            status
            created
            updated
            productId
        }
    }
}
`;
