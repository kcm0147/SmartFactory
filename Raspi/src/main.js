"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var serialport_1 = require("serialport");
var apollo_boost_1 = require("apollo-boost");
var item_1 = require("./controller/item");
require("cross-fetch/polyfill");
var Readline = serialport_1["default"].parsers.Readline;
var port = new serialport_1["default"]('/dev/cu.usbmodem14201', {
    baudRate: 9600
});
var parser = port.pipe(new Readline({
    delimiter: "\n",
    encoding: "utf8"
}));
var client = new apollo_boost_1["default"]({
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
function addTemperature(client, obj) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.mutate({
                        mutation: item_1.ADD_TEMPERATURE,
                        variables: obj
                    })];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
function addHumidity(client, obj) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.mutate({
                        mutation: item_1.ADD_HUMIDITY,
                        variables: obj
                    })];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
// async function delItem(client : ApolloClient<unknown>, id : number){
//   const result = await client.mutate ({
//     mutation: DEL_ITEM,
//     variables: {id}
//   });
//   console.log(result.data.result)
// }
function serialOpen(lineNum) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            port.open(function (msg) {
                if (msg) {
                    return console.log(msg.message);
                }
            });
            console.log("correct");
            parser.on('data', function (data) {
                data = data.substring(0, data.length - 2);
                console.log(data);
                var chunk = data.split(','); // chunk[0] is sensor name
                console.log(chunk);
                if (!chunk[0].localeCompare("TandHSensor")) {
                    var temperature = {
                        id: lineNum,
                        name: "Temperature",
                        temperature: chunk[1]
                    };
                    addTemperature(client, temperature);
                    console.log("Temperature : " + temperature);
                    var humidity = {
                        id: lineNum,
                        name: "Humidity",
                        humidity: chunk[2]
                    };
                    addHumidity(client, humidity);
                    console.log("Humidity : " + humidity);
                }
            });
            return [2 /*return*/];
        });
    });
}
(function main() {
    var Linenumber = "1"; // set Line number
    serialOpen(Linenumber);
})();
