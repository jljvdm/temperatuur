var http = require('http');
var fs = require("fs");
var ini = require("ini");

var config = ini.parse(fs.readFileSync('./collector/collector.ini', 'utf-8'));
console.log(config);