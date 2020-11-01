import { PubSub } from "graphql-yoga";
import { Temperature, Humidity, sampleTemperatures, 
    sampleHumidities, addTemperature, addHumidity } from "./db";

export const pubsub = new PubSub();

export const resolvers = {
    Query: {
        temperatures: () => sampleTemperatures,
        humidities: () => sampleHumidities,
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
        }
    }
}
