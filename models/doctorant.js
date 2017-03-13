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

Doc.updateDoct = function (idDoct, nom, prenom, telephone, email , callback) {
    db.cypherQuery("Match (d:doctorant) where id(d)=" + idDoct + " set d.nom = '"+nom+"' , d.prenom = '"+prenom+"'  , d.telephone = '"+telephone+"' , d.email = '"+email+"' return d", function(err, results) {
        if (err) return callback(err);
        /*console.log("------data doc 1-----");
        console.log(results.data);*/
        callback(null, results);
    });
}
Doc.updateThese = function (idThese, intitule, type, domaine, date_debut , date_fin, callback){
    var inti = intitule.replace(/'/g, "\\'");
    //var db = parseInt(date_debut.substring(6,10) + date_debut.substring(4,6) + date_debut.substring(0,2)) ;
    //var df = parseInt(date_fin.substring(6,10) + date_fin.substring(4,6) + date_fin.substring(0,2)) ;
    console.log("date") ;
    console.log(date_fin) ;
    console.log(parseInt(date_fin.replace(/-/g , ""))) ;
    db.cypherQuery("Match (t:these)<-[s]-(d:doctorant) where id(t)=" + idThese + " set t.intitule = '"+inti+"' , t.type = '"+type+"'  , t.domaine = '"+domaine+"' , s.date_debut = "+parseInt(date_debut.replace(/-/g , ""))+" , s.date_fin = "+parseInt(date_fin.replace(/-/g , ""))+" return d", function(err, results) {
        if (err) return callback(err);
        /*console.log("------data doc 1-----");
        console.log(results.data);*/
        callback(null, results);  
        });
}