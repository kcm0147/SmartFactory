export type Item = {
    id : number,
    name : string,
    temperature : number,
    humidity : number
}

export let sampleItems : Item[] = [
]

export const getById = (id : number) => {
    const filteredPeople = sampleItems.filter(i => i.id === id);
    return sampleItems[0];
}

export function addItem (obj : Item){
    if(obj.name === undefined){
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