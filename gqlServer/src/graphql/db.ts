export type Temperature = {
    id : string,
    name : string,
    temperature : string
}
export type Humidity = {
    id : string,
    name : string,
    humidity : string
}
export type Weight = {
    id : string,
    name : string,
    weight : string
}
export type Devicelist = {
    line : string,
    device : string
}


export let sampleDevicelist : Devicelist[] = [
    {line:"1", device:"temperature"},
    {line:"1", device:"humidity"},
    {line:"2", device:"temperature"},
    {line:"2", device:"humidity"}
]
export let sampleTemperatures : Temperature[] = []
export let sampleHumidities : Humidity[] = []
export let sampleWeights : Weight[] = []

export function addTemperature (obj : Temperature){
    if(obj.name === undefined)  return false;
    sampleTemperatures.push(obj);
    return true;
}
export function addHumidity (obj : Humidity){
    if(obj.name === undefined)  return false;
    sampleHumidities.push(obj);
    return true;
}
export function addWeight (obj : Weight){
    if(obj.name === undefined)  return false;
    sampleWeights.push(obj);
    return true;
}