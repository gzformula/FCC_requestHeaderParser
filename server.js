'use strict';

var express     = require('express'),
    app         = express(),
    port = process.env.PORT || 8080,
    requestLanguage = require('express-request-language'),
    cookieParser = require('cookie-parser');

 
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
    
app.get("/api/whoami", function(req, res) {
  var user = {
    agent: req.headers['user-agent'], // User Agent we get from headers
    referrer: req.headers['referrer'], //  Likewise for referrer
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress, // Get IP - allow for proxy
  };
  var lang = req.language;
    var responseString = JSON.stringify({ ipaddress: user.ip, language: lang, software: user.agent });
    res.send(responseString);
  console.log(user);
  res.end();
});
