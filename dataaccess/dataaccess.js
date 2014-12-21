/* 
 * Datatoegang
 */
var ini = require("ini");
var fs = require("fs");

var config = ini.parse(fs.readFileSync('./dataaccess/dataaccess.ini', 'utf-8'));
var mongoose = require('mongoose');


var exports = module.exports = {};
mongoose.connect(config.mongodb.url);

var metingSchema = new mongoose.Schema({
    datumtijd: {
        type: Date,
        index: true
    },
    buitentemperatuur: String,
    binnentemperatuur: String
});
metingSchema.set('autoIndex', true);


var koelkastSchema = new mongoose.Schema({
    naam: {
        type: String,
        index: {
            unique: true
        }
    },
    metingen: [metingSchema]
}, {
    collection: 'temperatuur'
});
koelkastSchema.set('autoIndex', true);


var Koelkast = mongoose.model('Koelkast', koelkastSchema);
var Meting = mongoose.model('Meting', metingSchema);

exports.updateKoelkast = function(data) {

    Koelkast.findOne({
        'naam': data.naam
    }, function(err, koelkast) {

        if (err) {
            console.log('err: ' + err);
        };

        if (!koelkast) {
            koelkast = new Koelkast();
            koelkast.naam = data.naam;
            koelkast.metingen = [];
        };

        var meting = new Meting();
        meting.datumtijd = data.metingen[0].datumtijd;
        meting.binnentemperatuur = data.metingen[0].binnentemperatuur;
        meting.buitentemperatuur = data.metingen[0].buitentemperatuur;

        koelkast.metingen.push(meting);

        koelkast.save(function(err) {
            if (err) {
                console.log('err: ' + err);
            };
        });
    });
};
