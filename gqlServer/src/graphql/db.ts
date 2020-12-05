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

export type Requestlist ={
    line : string,
    device : string
}


// export let sampleRequestlist : Requestlist[] = new Array<Requestlist>()
export let sampleRequestlist : Requestlist[] = [
    {line:"3", device:"temperature"},
    {line:"3", device:"humidity"},
    {line:"4", device:"temperature"},
    {line:"4", device:"humidity"},
    {line:"5", device:"temperature"},
    {line:"5", device:"humidity"},
    {line:"6", device:"temperature"},
    {line:"6", device:"humidity"}
]
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
export function addDevicelist (obj : Devicelist){
    if(obj.device === undefined)  return false;
    // sampleDevicelist 안에 line과 device들을 For문을 이용해서 검사한후에 중복된 line과 device들이 없으면 추가 (return true), 그게 아니라면 거절(return false)
    for(var i=0;i<sampleDevicelist.length;i++){
        var cur : Devicelist = sampleDevicelist[i];

        if(!cur.device.localeCompare(obj.device)&& !(cur.line.localeCompare(obj.line))){
            console.log("add");
            return false;
        }
    }

    sampleDevicelist.push(obj);
    return true;
}

export function addRequestlist (obj : Requestlist){
    console.log("call Request")
   if(obj.device === undefined)  return false;
    // sampleDevicelist 안에 line과 device들을 For문을 이용해서 검사한후에 중복된 line과 device들이 없으면 추가 (return true), 그게 아니라면 거절(return false)
    for(var i=0;i<sampleRequestlist.length;i++){
        var cur : Requestlist = sampleRequestlist[i];

        if(!cur.device.localeCompare(obj.device)&& !(cur.line.localeCompare(obj.line))){
            console.log("exist...");
            return false;
        }
    
    }

    sampleRequestlist.push(obj);
    console.log("add Reqest...");
    return true;
}