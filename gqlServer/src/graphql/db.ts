export type Item = {
    id : number, 
    name : string, 
    val : number, 
    from : string
}

export let sampleItems : Item[] = [
    {id: 14123, name: 'Apple', val: 1, from: 'Korea'},
    {id: 24123, name: 'Banana', val: 2, from: 'Taiwan'},
    {id: 33495, name: 'Orange', val: 3, from: 'LA'},
    {id: 41507, name: 'Melon', val: 4, from: 'Korea'},
]

export const getById = (id : number) => {
    const filteredPeople = sampleItems.filter(i => i.id === id);
    return sampleItems[0];
}

export function addItem (obj : Item){
    if(obj.val === undefined || 
        obj.from === undefined ||
        obj.name === undefined){
            return false;
        }
        
    obj.id = Math.floor(Math.random() * 100000);

    sampleItems.push(obj);
    return true;
}

export function delItem (id : number){
    const filteredPeople = sampleItems.filter(i => i.id === id);
    
    filteredPeople.map(e => (sampleItems.splice(sampleItems.indexOf(e), 1)));
    return true;
}