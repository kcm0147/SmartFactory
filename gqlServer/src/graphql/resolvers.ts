import { PubSub } from "graphql-yoga";
import { Temperature, Humidity, Weight, sampleTemperatures, 
    sampleHumidities, sampleWeights, addTemperature, addHumidity, addWeight } from "./db";

export const pubsub = new PubSub();

export const resolvers = {
    Query: {
        temperatures: () => sampleTemperatures,
        humidities: () => sampleHumidities,
        weights: () => sampleWeights,
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
        }
    }
}
