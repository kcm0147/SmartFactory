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
export type Devicelist = {
    line : string,
    device : string
}

export let devicelist : Devicelist[] = [
    {line:"1", device:"temperature"},
    {line:"1", device:"humidity"},
    {line:"2", device:"humidity"}
]
export let sampleTemperatures : Temperature[] = []
export let sampleHumidities : Humidity[] = []

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