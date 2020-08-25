const grpc = require('grpc')
const rpcProto = grpc.load('rpc.proto')
const vm = require('vm');
const util = require('util');
const fetch = require("node-fetch");

const url = "https://reqres.in/api/users?per_page=20"


const context = {
    testBool: false,
    util: util,
};

const server = new grpc.Server()
server.addService(rpcProto.CodeService.service, {
    executejs: async (call, callback) => {
        var resp
        try {
            const response = await fetch(url);
            resp = await response.json();
            console.log(json);
        } catch (error) {
            console.log(error);
        }
        const script = new vm.Script('testBool = util.types.isMap(new Map()); ' + call.request.code);

        vm.createContext(context);
        script.runInContext(context);

        console.log(context.testBool)
        callback(null, {resp: JSON.stringify(resp) + " SetValue: " + context.testBool})
    },
})
server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
console.log('Server running at http://127.0.0.1:50051')
server.start()
