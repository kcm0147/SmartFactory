"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.ADD_HUMIDITY = exports.ADD_TEMPERATURE = void 0;
var apollo_boost_1 = require("apollo-boost");
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
exports.ADD_TEMPERATURE = apollo_boost_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nmutation ($id : String!,$name : String!, $temperature : String!){\n  result : addTemperature(id:$id,name : $name, temperature : $temperature) \n}\n"], ["\nmutation ($id : String!,$name : String!, $temperature : String!){\n  result : addTemperature(id:$id,name : $name, temperature : $temperature) \n}\n"])));
exports.ADD_HUMIDITY = apollo_boost_1.gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nmutation ($id: String!,$name : String!,$humidity : String!){\n  result : addHumidity(id:$id,name : $name,humidity : $humidity) \n}\n"], ["\nmutation ($id: String!,$name : String!,$humidity : String!){\n  result : addHumidity(id:$id,name : $name,humidity : $humidity) \n}\n"])));
var templateObject_1, templateObject_2;
// export const DEL_ITEM = gql`
// mutation itemData($id : Int!){
//   result : delItem(id : $id)
// }
// `;
