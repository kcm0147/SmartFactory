import { gql } from "apollo-boost";

export const GET_ITEMS = gql`
query {
  items {
    id, name
  }
}
`

export const GET_ITEM = gql`
query ($id : Int!){
  item(id : $id) {
    id 
    name 
    age
  }
}
`;
