
import SerialPort from "serialport";
import {ApolloClient, HttpLink, split, gql} from "apollo-boost";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory"
import {Item, GET_ITEM, GET_ITEMS, ADD_ITEM, DEL_ITEM} from "./controller/item"
import 'cross-fetch/polyfill';


const Readline = SerialPort.parsers.Readline;

const port = new SerialPort('COM6', {
    baudRate: 9600
});

const parser = port.pipe(new Readline({
    delimiter: "\n",
    encoding: "utf8",
}));


const httpLink = new HttpLink({
  uri: "http://localhost:4000"
})

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/",
  options: {
      reconnect: true,
  },
})

const link = split(
  ({query}) => {
      const definition = getMainDefinition(query);
      return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);


const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
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

async function addItem(client : ApolloClient<unknown>, obj : Item){
  const result = await client.mutate ({
    mutation: ADD_ITEM,
    variables: obj
  });

  console.log(result.data.result)
}

async function delItem(client : ApolloClient<unknown>, id : number){
  const result = await client.mutate ({
    mutation: DEL_ITEM,
    variables: {id}
  });

  console.log(result.data.result)
}

async function serialOpen()
{
    port.open(function (msg) {
        if (msg) {
            return console.log(msg.message)
        }
    })
    
    parser.on('data', (data : string)=>{
        data = data.substring(0, data.length-2);
        //console.log(data)
        let chunk = data.split(',')
        //console.log(chunk)
        let list : number[] = [];

        for(var i=0; i<chunk.length; i++){
            list.push(Number.parseFloat(chunk[i]));
        }

        let obj : Item = {
          id : 0,
          name : "Temperature",
          temperature : list[0],
          humidity : list[1],
        }

        console.log(list)
        addItem(client,obj);
        //sendUpdateMessage(list)
    });

  }




    async function main(){
      // list 조회

      serialOpen();


      // await getItems(client);
      // // // item 조회
      // await getItem(client, 14123);
    
      // // // item 추가
      // let obj : Item = {
      //   id : 0,
      //   name : "Kil-Dong",
      //   age : 5,
      //   from : "Korea"
      // }
      // await addItem(client, obj);
    
      // // item 삭제
      // await delItem(client, 24123);
    }
