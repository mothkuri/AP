#!/usr/bin/env node
var debug = require('debug')('AssociatePortal');
var app = require('./app');
var express = require('express');
//var fs = require('fs');


    //var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
   app.set('port', (process.env.PORT || 5000));

       /* if (typeof ipaddress === "undefined") {
            // Log errors on OpenShift but continue w/ 127.0.0.1 - this
            // allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            ipaddress = "127.0.0.1";
        };*/



 //https = require('https');
  //http = require('http');

//var privateKey  = fs.readFileSync('key.pem');
//var certificate = fs.readFileSync('cert.pem');

//var credentials = {key: privateKey, cert: certificate};


//var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

/*httpServer.listen(port, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), port);
        });*/
//httpServer.listen(3000);
//httpsServer.listen(8090);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


