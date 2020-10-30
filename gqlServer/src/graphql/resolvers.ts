import {Item, getById, sampleItems, addItem, delItem} from "./db";

export const resolvers = {
    Query: {
        items: () => sampleItems,
        item: (_ : any, obj : Item) => {return getById(obj.id)}
    },
    Mutation: {
        addItem: (_ : any, obj : Item) => {return addItem(obj)},
        delItem: (_ : any, obj : Item) => {return delItem(obj.id)}
    }
}
