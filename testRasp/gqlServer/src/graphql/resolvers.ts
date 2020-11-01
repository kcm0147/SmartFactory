import { PubSub } from "graphql-yoga";
import {Item, getById, sampleItems, addItem, delItem} from "./db";

export const pubsub = new PubSub();

export const resolvers = {
    Query: {
        items: () => sampleItems,
        item: (_ : any, obj : Item) => {return getById(obj.id)}
    },
    Mutation: {
        addItem: (_ : any, newItem : Item) => {
            pubsub.publish("NEW_ITEM", {
                newItem
              })
            return addItem(newItem)
        },
        delItem: (_ : any, obj : Item) => {return delItem(obj.id)}
    },
    Subscription: {
        newItem: {
            subscribe: (_:any, __:any) => 
            pubsub.asyncIterator("NEW_ITEM")
        }
    }
}
