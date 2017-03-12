var neo4j = require('node-neo4j');
db = new neo4j('http://neo4j:123456789@localhost:7474');

var Doc = module.exports = function Doc(_node) {
    this._node = _node;
}

Doc.get = function (idDoct, callback) {
    db.cypherQuery("MATCH (d:doctorant)-[s:soutient]-(t:these)-[r]-(m:membre_jury) where id(d)="+ idDoct +" return d, t, s, m, type(r)", function (err, results) {
        if (err) return callback(err);
        /*console.log("------data doc 1-----");
        console.log(results.data);*/
        callback(null, results);
    });
};

Doc.getAll = function (callback) {
    db.cypherQuery("MATCH (d:doctorant)-[:soutient]-(t:these) return d, t", null, function (err, results) {
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

Doc.getDoct = function (idDoct, callback) {
    db.cypherQuery("Match (d:doctorant) where id(d)=" + idDoct + " return d", function(err, results) {
        if (err) return callback(err);
        /*console.log("------data doc 1-----");
        console.log(results.data);*/
        callback(null, results);
    });
}