import { PubSub } from "graphql-yoga";
import { Temperature, Humidity, Weight,Devicelist,sampleDevicelist, sampleTemperatures, 
    sampleHumidities, sampleWeights, addTemperature, addHumidity, addWeight,addDevicelist,addRequestlist,deleteRequestlist,sampleRequestlist,Requestlist } from "./db";


export const pubsub = new PubSub();

export const resolvers = {
    Query: {
        temperatures: () => sampleTemperatures,
        humidities: () => sampleHumidities,
        weights: () => sampleWeights,
        devicelist: () => sampleDevicelist,
        requestlist: () => sampleRequestlist
    },
    Mutation: {
        addTemperature: (_ : any, newTemperature : Temperature) => {
            pubsub.publish("NEW_TEMPERATURE", {
                newTemperature
              })
            return addTemperature(newTemperature)
        },
        addHumidity: (_ : any, newHumidity : Humidity) => {
            pubsub.publish("NEW_HUMIDITY", {
                newHumidity
              })
            return addHumidity(newHumidity)
        },
        addWeight: (_ : any, newWeight : Weight) => {
            pubsub.publish("NEW_WEIGHT", {
                newWeight
              })
            return addWeight(newWeight)
        },
        addDevicelist: (_ : any, newDevice : Devicelist) => {
            pubsub.publish("NEW_DEVICE", {
                newDevice
              })
            return addDevicelist(newDevice)
        },
        addRequestlist: (_ : any, newRequestlist : Requestlist) => {
            pubsub.publish("NEW_REQUEST", {
                newRequestlist
              })
            return addRequestlist(newRequestlist)
        },
        deleteRequestlist: (_ : any, curRequestlist : Requestlist) => {
            pubsub.publish("NEW_REQUESTDELETE", {
                curRequestlist
              })
            return deleteRequestlist(curRequestlist.line,curRequestlist.device)
        }
    },
    Subscription: {
        newTemperature: {
            subscribe: (_:any, __:any) => 
            pubsub.asyncIterator("NEW_TEMPERATURE")
        },
        newHumidity: {
            subscribe: (_:any, __:any) => 
            pubsub.asyncIterator("NEW_HUMIDITY")
        },
        newWeight: {
            subscribe: (_:any, __:any) => 
            pubsub.asyncIterator("NEW_WEIGHT")
        },
        newDevicelist:{
            subscribe: (_:any, __:any) => 
            pubsub.asyncIterator("NEW_DEVICE")
        },
        newRequestlist:{
            subscribe: (_:any, __:any) => 
            pubsub.asyncIterator("NEW_REQUEST")
        },
        DeleteRequestlist:{
            subscribe: (_:any, __:any) => 
            pubsub.asyncIterator("NEW_REQUESTDELETE")
        }
    }
}
