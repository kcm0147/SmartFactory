export type Item = {
    id : number,
    weight : number
}

export let sampleItems : Item[] = [
    {id:1, weight: 10},
    {id:2, weight: 2},
    {id:3, weight: 14},
    {id:4, weight: 8}
]

export const getById = (id : number) => {
    const filteredPeople = sampleItems.filter(i => i.id === id);
    return sampleItems[0];
}

export function addItem (obj : Item){
    if(obj.weight === undefined){
            return false;
        }
        
    // obj.id = Math.floor(Math.random() * 100000);

    sampleItems.push(obj);
    return true;
}

export function delItem (id : number){
    const filteredPeople = sampleItems.filter(i => i.id === id);
    
    filteredPeople.map(e => (sampleItems.splice(sampleItems.indexOf(e), 1)));
    return true;
}