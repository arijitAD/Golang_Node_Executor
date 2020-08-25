const vm = require('vm');
const util = require('util');

const context = {
  animal: 'cat',
  count: 2,
  testBool: false,
  util: util,
};

const script = new vm.Script('count += 1; name = "kitty"; testBool = util.types.isMap(new Map());');

vm.createContext(context);
for (let i = 0; i < 1000; ++i) {
  script.runInContext(context);
}

console.log(context.testBool);
