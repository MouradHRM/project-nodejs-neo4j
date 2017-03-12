var neo4j = require('node-neo4j');
db = new neo4j('http://neo4j:123456789@localhost:7474');

var Membre_jury = module.exports = function Membre_jury(_node) {
    this._node = _node;
}

Membre_jury.get = function (idMembreJury, callback) {

    db.cypherQuery("MATCH (m:membre_jury) -[r]-> (t:these)<-[s:soutient]-(d:doctorant) where id(m) = "+ idMembreJury +" RETURN m, t, type(r), d", function (err, results) {
             console.log("------id -----");
    console.log(idMembreJury);
        if (err) return callback(err);
        console.log("------data membre jury 1-----");
        console.log(results.data);
        callback(null, results);
    });
};

Membre_jury.getAll = function (callback) {
    db.cypherQuery("match(m:membre_jury) return m", null, function (err, results) {
        if (err) return callback(err);
        /*console.log("------data doc 1-----");
        console.log(results.data[0][0]);
        console.log("------data these 1-----");
        console.log(results.data[0][1]);
        console.log("------columns-----");
        console.log(results.columns);*/
        callback(null, results);
    });
};