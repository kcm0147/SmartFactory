import { gql } from "apollo-boost";

export interface Temperature {
  id : string,
  name : string,
  temperature : string
}
export interface Humidity{
  id : string,
  name : string,
  humidity : string
}


// export const GET_ITEMS = gql`
// query {
//   items {
//     id, name
//   }
// }
// `;

// export const GET_ITEM = gql`
// query ($id : Int!){
//   item(id : $id) {
//     id 
//     name
//     temperature
//     humidity
//   }
// }
// `;

export const ADD_TEMPERATURE = gql`
mutation ($id : String!,$name : String!, $temperature : String!){
  result : addTemperature(id:$id,name : $name, temperature : $temperature) 
}
`;

export const ADD_HUMIDITY = gql`
mutation ($id: String!,$name : String!,$humidity : String!){
  result : addHumidity(id:$id,name : $name,humidity : $humidity) 
}
`;

// export const DEL_ITEM = gql`
// mutation itemData($id : Int!){
//   result : delItem(id : $id)
// }
// `;