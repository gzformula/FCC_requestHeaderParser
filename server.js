'use strict';

var express     = require('express'),
    ipMod = require('./ip.js'),
    app         = express(),
    port = process.env.PORT || 8080,
    requestLanguage = require('express-request-language'),
    cookieParser = require('cookie-parser'),
    os = require('os'),
    platform = require('platform');
 
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
	console.log("Language:", request.language);
    
    console.log(platform.name); // 'IE'
	console.log(platform.version); // '10.0'
	console.log(platform.layout); // 'Trident'
	console.log(platform.os); // 'Windows Server 2008 R2 / 7 x64'
	console.log(platform.description); // 'IE 10.0 x86 (platform preview; running in IE 7 mode) on Windows Server 2008 R2 / 7 x64'

    ipMod(request, function(err, ipinfo) {
       if (err) throw err;
         console.log(ipinfo);
         response.send(ipinfo);
    });
    
    response.end();
});