var http = require('http');
var fs = require("fs");
var ini = require("ini");

var config = ini.parse(fs.readFileSync('./collector.ini', 'utf-8'))