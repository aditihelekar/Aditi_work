var Hapi = require('hapi');
var MySQL = require('mysql');
var Joi = require('joi');
// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    port: process.env.PORT || 8000,
    host:'0.0.0.0',
    routes: {cors : true}

});

// server.register({
//   register: require('hapi-cors'),
//   options: {
//     origins: ['http://localhost:8000']
//   }
// }, function(err){
//   server.start(function(){
//     console.log(server.info.uri);
//   });
// });

console.log("Server connected.");

// Add the route
server.route({
    method: 'GET',
    path:'/getTrafficSign', 
    handler: function (request, reply) {
      var lat = request.query.latitude;
      var lon = request.query.longitude;
      var dist = request.query.distance;
      console.log(lat,lon,dist);
      pool.query('SELECT * FROM(SELECT *,(((acos(sin((' + lat + '*pi()/180)) * sin((latitude*pi()/180))+cos((' + lat + '*pi()/180)) * cos((latitude*pi()/180)) * cos(((' + lon + '- longitude)*pi()/180))))*180/pi())*60*1.1515*1.609344) as distance FROM signsdata) t WHERE distance <=' +  dist + ' ORDER BY distance ASC LIMIT 1',
      // connection.query('SELECT trafficSign from signsData WHERE latitude =' + lat + ' AND longitude = ' + lon,
        function(error, results, fields) {
       if (error) throw error;
       reply(results);
     });
    }
});

server.route({
    method: 'POST',
    path: '/feedTrafficSign',
    handler: function (request, reply) {
    var lat = request.query.latitude;
    var lon = request.query.longitude;
    var sign = request.query.sign;
    console.log(lat,lon,sign);
    //connection.query('insert into signsData values (default, 35.316876, -80.744161, "ONE_WAY")',
    //connection.query('INSERT INTO signsData values (default, '+ lat +',' + lon +', "' + sign + '")',
    pool.query('INSERT INTO signsData (latitude, longitude, trafficSign) SELECT * FROM (SELECT ' + lat + ' , ' + lon  + ' , "' + sign +
     '") AS tmp WHERE NOT EXISTS (SELECT * FROM signsData WHERE latitude = ' + lat + ' AND longitude = ' + lon + ' )LIMIT 1',
    function (error, results, fields) {
        if (error) throw error;

        reply(results);
    });
},
config: {
    validate: {
    params: {
    Latitude: Joi.number().integer().min(8).max(9),
    Longitude: Joi.number().integer().min(8).max(9),
    Sign: Joi.string().min(4).max(30)
}
}

}
});

// const connection = MySQL.createConnection({
//      host: 'us-cdbr-iron-east-05.cleardb.net',
//      user: 'b2e64fd97a8af5',
//      password: 'aee006e0',
//      database: 'heroku_c7a5b97ad31680e',
// });


var pool  = MySQL.createPool({
  connectionLimit : 10,
  host: 'us-cdbr-iron-east-05.cleardb.net',
   user: 'b2e64fd97a8af5',
   password: 'aee006e0',
   database: 'heroku_c7a5b97ad31680e'
});

// connection.connect();
console.log("Connected to mysql server")

server.start((err) => {
   if (err) {
     throw err;
   }
  console.log('Server running at:', server.info.uri);
});



