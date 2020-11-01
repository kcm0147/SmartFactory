import { gql } from "apollo-boost";

export interface Item{
    id : number,
    name : string,
    temperature : number,
    humidity : number
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
mutation ($name : String!, $temperature : Int!, $humidity : Int!){
  result : addItem(name : $name, temperature : $temperature, humidity : $humidity) 
}
`;

export const DEL_ITEM = gql`
mutation itemData($id : Int!){
  result : delItem(id : $id)
}
`;