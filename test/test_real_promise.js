var promisesAplusTests = require('promises-aplus-tests');
var adapter = require('../real_promise');

var mocha = require('mocha');

describe("Promises/A+ Tests", function () {
    require("promises-aplus-tests").mocha(adapter);
});
