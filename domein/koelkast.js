function Koelkast(naam) {
    this.naam = naam;
    this.metingen = [];
};
Koelkast.prototype.addMeting = function(meting) {
    this.metingen.push(meting);
};

module.exports = Koelkast;
