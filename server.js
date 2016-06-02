'use strict';

var express     = require('express'),
    ipMod = require('./ip.js'),
    app         = express(),
    port = process.env.PORT || 8080,
    requestLanguage = require('express-request-language'),
    cookieParser = require('cookie-parser'),
    os = require('os'),
    platformMod = require('platform');
 
app.use(express.static('public'));

app.use(cookieParser());

app.use(requestLanguage({
  languages: ['en-US', 'zh-CN', 'ru', 'uk', 'ru-mo', 'be'],
  cookie: {
    name: 'language',
    options: { maxAge: 24*3600*1000 },
    url: '/languages/{language}'
  }
}));

app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});

app.get("/index", function(request, response) {
        if (root == '' || root == 'index.html') {
        response.writeHead(301, {
          Location: (request.socket.encrypted ? 'https://' : 'http://') +
          request.headers.host + '/index.html'}
    );
    response.end();
    return;
    }
});

app.get("/api/whoami", function(request, response) {
	var lang = request.language;
	var desc = platformMod.description; // 'IE 10.0 x86 (platform preview; running in IE 7 mode) on Windows Server 2008 R2 / 7 x64'
    var ipinfo = "";
    ipMod(request, function(err, ip) {
       if (err) throw err;
       ipinfo = ip;
    });
    //{"ipaddress":"71.120.189.78","language":"en-US","software":"Windows NT 10.0; WOW64"}
    var responseString = JSON.stringify({ ipaddress: ipinfo, language: lang, software: desc });
    response.send(responseString);
    response.end();
});