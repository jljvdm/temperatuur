var http = require('http');
var url = require('url');
var fs = require('fs');
var ini = require("ini");

var dataaccess = require("../dataaccess/dataaccess.js");


var config = ini.parse(fs.readFileSync('./rapport/rapport.ini', 'utf-8'));
console.log(config);

var server = http.createServer(

    function(req, res) {
        var parsedUrl = url.parse(req.url, true);


        if (req.method == "POST") {
            if (parsedUrl['path'] == '/gegevens') {

                var body = "";
                var obj;

                req.on('data', function(data) {
                    body += data;
                    //  console.log("Partial body: " + body);
                });
                req.on('end', function() {
                    obj = JSON.parse(body.toString());
                    dataaccess.updateKoelkast(JSON.parse(body));

                });


                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                var result = "OK";
                res.end(JSON.stringify(result));

            }
        }

        res.writeHead(400);
        res.end();
    }
);
server.listen(config.rapportage.poort);