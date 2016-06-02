var getIP = require('ipware')().get_ip;

 module.exports = function (request, callback) { 
    var ipInfo = getIP(request);
    console.log(ipInfo);
    // { clientIp: '127.0.0.1', clientIpRoutable: false }
    callback(null,ipInfo);
};