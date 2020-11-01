import { gql } from "apollo-boost";

export interface Temperature {
  id : number,
  name : string,
  temperature : string
}
export interface Humidity{
  id : number,
  name : string,
  humidity : string
}


export const GET_ITEMS = gql`
query {
  items {
    id, name
  }
}
`;

export const GET_ITEM = gql`
query ($id : Int!){
  item(id : $id) {
    id 
    name
    temperature
    humidity
  }
}
`;

export const ADD_TEMPERATURE = gql`
mutation ($name : String!, $temperature : String!){
  result : addTemperature(name : $name, temperature : $temperature) 
}
`;

export const ADD_HUMIDITY = gql`
mutation ($name : String!,$humidity : String!){
  result : addItem(name : $name,humidity : $humidity) 
}
`;

// export const DEL_ITEM = gql`
// mutation itemData($id : Int!){
//   result : delItem(id : $id)
// }
// `;