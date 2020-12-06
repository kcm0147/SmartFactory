import SerialPort from "serialport";
import ApolloClient, { gql } from "apollo-boost";

import { Temperature, Humidity, Requestlist, Weight, Fire, ADD_TEMPERATURE, ADD_HUMIDITY, ADD_REQUEST, ADD_WEIGHT, ADD_FIRE } from "./controller/item"
import 'cross-fetch/polyfill';
import { Request } from "cross-fetch";


const Readline = SerialPort.parsers.Readline;


const port = new SerialPort('/dev/cu.usbmodem14201', {
  baudRate: 9600
});

const parser = port.pipe(new Readline({
  delimiter: "\n",
  encoding: "utf8",
}));

const client = new ApolloClient({
  uri: "http://192.168.43.175:4000/"
});



export let sampleRequestList: string[] = new Array<string>()


// async function getItems(client : ApolloClient<unknown>){
//   const result = await client.query ({
//     query: GET_ITEMS,
//   });

//   console.log(result.data.items)
// }

// async function getItem(client : ApolloClient<unknown>, id : number){
//   const result = await client.query ({
//     query: GET_ITEM,
//     variables: {
// //       id : id
// //     }
// //   });

//   console.log(result.data.item)
// }

async function addTemperature(client: ApolloClient<unknown>, obj: Temperature) {
  const result = await client.mutate({
    mutation: ADD_TEMPERATURE,
    variables: obj
  });

  console.log(result)
}

async function addHumidity(client: ApolloClient<unknown>, obj: Humidity) {
  const result = await client.mutate({
    mutation: ADD_HUMIDITY,
    variables: obj
  });

  console.log(result)
}

async function addRequestlist(client: ApolloClient<unknown>, obj: Requestlist) {
  const result = await client.mutate({
    mutation: ADD_REQUEST,
    variables: obj
  });

  console.log(result)
}

async function addWeight(client: ApolloClient<unknown>, obj: Weight) {
  const result = await client.mutate({
    mutation: ADD_WEIGHT,
    variables: obj
  });

  console.log(result)
}

async function addFire(client: ApolloClient<unknown>, obj: Fire) {
  const result = await client.mutate({
    mutation: ADD_FIRE,
    variables: obj
  });

  console.log(result)
}

// async function delItem(client : ApolloClient<unknown>, id : number){
//   const result = await client.mutate ({
//     mutation: DEL_ITEM,
//     variables: {id}
//   });

//   console.log(result.data.result)
// }

async function serialOpen(lineNum: string) {
  port.open(function (msg) {
    if (msg) {
      return console.log(msg.message)
    }
  })


  parser.on('data', (data: string) => {
    data = data.substring(0, data.length - 2);
    let chunk = data.split(',') // chunk[0] is sensor name
    console.log(chunk)


    if (!chunk[0].localeCompare("TandHSensor")) { // temperature and humidity
        responseTandH(lineNum,chunk[0],chunk[1],chunk[2]);
    }
    else if(!chunk[0].localeCompare("ForceSensor")){
        responseWeight(lineNum,chunk[0],chunk[1])
    }
    else if(!chunk[0].localeCompare("FlameSensor")){
        responseFire(lineNum,chunk[0],chunk[1])
    }

  });


}



function responseTandH(lineNum:string,device : string,resTemperature : string,resHumidity:string){

  let flag=false;

  
  flag=checkRequestlist(device)

  if (!flag) {
    inputRequestDevice(lineNum,device)
  }

  let temperature: Temperature = {
    id: lineNum,
    name: "Temperature",
    temperature: resTemperature
  }
  addTemperature(client, temperature);
  console.log("Temperature : " + temperature)

  let humidity: Humidity = {
    id: lineNum,
    name: "Humidity",
    humidity: resHumidity
  }

  addHumidity(client, humidity);
  console.log("Humidity : " + humidity)

}

function responseWeight(lineNum:string,device : string,resWeight : string){

  let flag=false;

  flag=checkRequestlist(device)

  if (!flag) {
    inputRequestDevice(lineNum,device)
  }

  let weight: Weight = {
    id: lineNum,
    name: "Weight",
    weight: resWeight
  }
  addWeight(client, weight);
  console.log("Weight : " + weight)

}

function responseFire(lineNum:string,device : string,resFire : string){

  let flag=false;

  flag=checkRequestlist(device)

  if (!flag) {
    inputRequestDevice(lineNum,device)
  }

  let fire: Fire = {
    id: lineNum,
    name: "Fire",
    fire: resFire
  }
  addFire(client, fire);
  console.log("Fire : " + resFire)
}



function checkRequestlist(device : string){

  for (var i = 0; i < sampleRequestList.length; i++) {
    var cur: string = sampleRequestList[i];
    if (!cur.localeCompare(device)) {
      return true;
    }
  }

  return false;
}

function inputRequestDevice(lineNum:string,device : string){
  sampleRequestList.push(device);

    let requestCur: Requestlist = {
      line: lineNum,
      device: device
    }
    addRequestlist(client, requestCur);
    console.log("add Request!!!")
}



(function main() {
  let Linenumber: string = "1"; // set Line number
  serialOpen(Linenumber);
})();