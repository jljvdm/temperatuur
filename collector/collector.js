var Koelkast = require("../domein/koelkast.js");
var Meting = require("../domein/meting.js");

var http = require('http');
var fs = require("fs");
var ini = require("ini");


var config = ini.parse(fs.readFileSync('./collector/collector.ini', 'utf-8'));
console.log(config);

setInterval(function() {

  var koelkast = new Koelkast(config.collector.naam);
  var meting = new Meting(new Date().toUTCString());

  if (config.sensoren.binnen) {
    meting.setBinnenTemperatuur(fs.readFileSync(config.sensoren.binnen, "ascii").split("=")[2] / 1000);
  };
  if (config.sensoren.buiten) {
    meting.setBuitenTemperatuur(fs.readFileSync(config.sensoren.buiten, "ascii").split("=")[2] / 1000);
  };
  koelkast.addMeting(meting);

  verzendData(JSON.stringify(koelkast))

}, config.collector.interval);

/*
 * Verzend de data naar de centrale rapportage
 */
function verzendData(data) {
  console.log(data);
  var options = {
    host: config.rapportage.adres,
    port: config.rapportage.poort,
    method: 'POST',
    path: "/gegevens",
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  var req = http.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      var resultObject = JSON.parse(responseString);
    });

  });

  /*
   * Log error en stop process
   */
  req.on('error', function(e) {
    console.log(e);
    process.exit(1);
  });

  req.write(data, "utf-8");
  req.end();

};