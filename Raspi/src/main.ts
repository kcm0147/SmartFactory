import SerialPort from "serialport";
import ApolloClient, { gql } from "apollo-boost";

import {Temperature,Humidity,ADD_TEMPERATURE,ADD_HUMIDITY} from "./controller/item"
import 'cross-fetch/polyfill';


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

async function addTemperature(client : ApolloClient<unknown>, obj : Temperature){
  const result = await client.mutate ({
    mutation: ADD_TEMPERATURE,
    variables: obj
  });

  console.log(result)
}

async function addHumidity(client : ApolloClient<unknown>, obj : Humidity){
  const result = await client.mutate ({
    mutation: ADD_HUMIDITY,
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

async function serialOpen(lineNum : string)
{
    port.open(function (msg) {
        if (msg) {
            return console.log(msg.message)
        }
    })

    console.log("correct")
    
    parser.on('data', (data : string)=>{
        data = data.substring(0, data.length-2);
        console.log(data)
        let chunk = data.split(',') // chunk[0] is sensor name
        console.log(chunk)
       
        
        if(!chunk[0].localeCompare("TandHSensor")){
          let temperature : Temperature = {
            id : lineNum,
            name : "Temperature",
            temperature : chunk[1]
          }
         addTemperature(client,temperature);
          console.log("Temperature : " + temperature)
  
          let humidity : Humidity = {
            id : lineNum,
            name : "Humidity",
            humidity : chunk[2]
          }
          addHumidity(client,humidity);
          console.log("Humidity : " + humidity)
        }

    
    });

  }

    ( function main(){
      let Linenumber : string="2"; // set Line number
      serialOpen(Linenumber);
    })();