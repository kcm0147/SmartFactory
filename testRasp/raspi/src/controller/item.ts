import { gql } from "apollo-boost";

export interface Item{
    id : number,
    name : string,
    age : number,
    from : string
}

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

export const ADD_ITEM = gql`
mutation ($name : String!, $age : Int!, $from : String!){
  result : addItem(name : $name, age : $age, from : $from) 
}
`;

export const DEL_ITEM = gql`
mutation itemData($id : Int!){
  result : delItem(id : $id)
}
`;