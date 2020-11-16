
import SerialPort from "serialport";
import ApolloClient, { gql } from "apollo-boost";

import {Temperature,Humidity,GET_ITEM, GET_ITEMS, ADD_TEMPERATURE,ADD_HUMIDITY} from "./controller/item"
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
  uri: "http://220.66.219.69:4000/"
});

async function getItems(client : ApolloClient<unknown>){
  const result = await client.query ({
    query: GET_ITEMS,
  });

  console.log(result.data.items)
}

async function getItem(client : ApolloClient<unknown>, id : number){
  const result = await client.query ({
    query: GET_ITEM,
    variables: {
      id : id
    }
  });

  console.log(result.data.item)
}

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

async function serialOpen()
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
        let chunk = data.split(',')
        // console.log(chunk)
        let list : string[] = [];

        // temperature 인지 humidity 인지 분리할 수 있는 무언가를 만들어야함
        let temperature : Temperature = {
          id : 0,
          name : "Temperature",
          temperature : chunk[0]
        }
        addTemperature(client,temperature);
        console.log("Temperature : " + temperature)

        let humidity : Humidity = {
          id : 0,
          name : "Humidity",
          humidity : chunk[1]
        }
        addHumidity(client,humidity);
        console.log("Humidity : " + humidity)


        
    });

  }


    ( function main(){
      serialOpen();
    })();