var getIP = require('ipware')().get_ip;

var getClientAddress = function (req) {
    // Get client IP address from request object ----------------------
        var ip = (req.headers['x-forwarded-for'] || '').split(',')[0] 
        || req.connection.remoteAddress;
        return ip;
};

 module.exports = function (request, callback) { 
     var ip = getClientAddress(request);
     console.log("ip Address:", ip);
    callback(null,ip);
};

