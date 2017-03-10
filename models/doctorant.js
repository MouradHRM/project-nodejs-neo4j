var neo4j = require('node-neo4j');
db = new neo4j('http://neo4j:123456789@localhost:7474');

var Doc = module.exports = function Doc(_node) {
    this._node = _node;
}

Doc.get = function (idDoct, callback) {
    db.cypherQuery("MATCH (doct:Doctorant {idDoct: {id}}) return doct", {
        id: idDoct,
    }, function (err, results) {
        if (err) return callback(err);
        if (!results.length) {
            err = new Error('No such user with idDoct: ' + idDoct);
            return callback(err);
        }
        var doct = new Doc(results[0]['doct']);
        //callback(null, doct);
    });
};

Doc.getAll = function (callback) {
    db.cypherQuery("MATCH (doct:Doctorant) return doct", null, function (err, results) {
        if (err) return callback(err);
        //console.log(results.data[0]);
        callback(null, results);
    });
};