/* 
 * Datatoegang
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var exports = module.exports = {};


exports.sayHelloInEnglish = function() {
    return "HELLO";
};

exports.sayHelloInSpanish = function() {
    return "Hola";
};

exports.updateKoelkast = function(data) {
    console.log(data);
};
// module.exports = {

//     updateKoelkast: function(data) {
//         console.log(data);
//     }

// };
