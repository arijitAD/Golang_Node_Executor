const grpc = require('grpc')
const rpcProto = grpc.load('rpc.proto')
const vm = require('vm');
const util = require('util');
const fetch = require("node-fetch");

const url = "https://reqres.in/api/users?per_page=20"


const context = {
    testBool: false,
    util: util,
    output: "",
    fetch: fetch
};

const server = new grpc.Server()
server.addService(rpcProto.CodeService.service, {
    executejs: async (call, callback) => {
        const script = new vm.Script('testBool = util.types.isMap(new Map()); ' + call.request.code);

        vm.createContext(context);
        script.runInContext(context);

        console.log(context.testBool)
        console.log(context.output)
        callback(null, {resp: JSON.stringify(context.output) + " SetValue: " + context.testBool})
    },
})
server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
console.log('Server running at http://127.0.0.1:50051')
server.start()
