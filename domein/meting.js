function Meting(datumtijd) {
    this.datumtijd = datumtijd;
};
Meting.prototype.setBuitenTemperatuur = function(buitentemperatuur) {
    this.buitentemperatuur = buitentemperatuur;
};
Meting.prototype.setBinnenTemperatuur = function(binnentemperatuur) {
    this.binnentemperatuur = binnentemperatuur;
};

module.exports = Meting;