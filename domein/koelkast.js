function koelkast(naam) {
    this.naam = naam;
    this.metingen = [];
    this.addMeting = function(datum, binnentemperatuur, buitentemperatuur) {
        var meting = {};
        meting.datum = datum;
        meting.binnentemperatuur = binnentemperatuur;
        meting.buitentemperatuur = buitentemperatuur;
        this.metingen.push(meting);
    }
    this.addMetingBuitenTemperatuur = function(datum, buitentemperatuur) {
        var meting = {};
        meting.datum = datum;
        meting.buitentemperatuur = buitentemperatuur;
        this.metingen.push(meting);
    }
    this.addMetingBinnenTemperatuur = function(datum, binnentemperatuur) {
        var meting = {};
        meting.datum = datum;
        meting.binnentemperatuur = binnentemperatuur;
        this.metingen.push(meting);
    }
}