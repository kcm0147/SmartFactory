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