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

export interface Weight{
  id : string,
  name : string,
  weight : string
}

export type Requestlist ={
  line : string,
  device : string
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

export const ADD_WEIGHT = gql`
mutation ($id: String!,$name : String!,$weight : String!){
  result : addHumidity(id:$id,name : $name,weight : $weight) 
}
`;

export const ADD_REQUEST = gql`
mutation ($line: String!,$device : String!){
  result : addRequestlist(line : $line,device: $device) 
}
`;

// export const DEL_ITEM = gql`
// mutation itemData($id : Int!){
//   result : delItem(id : $id)
// }
// `;