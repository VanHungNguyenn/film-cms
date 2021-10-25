const request = require('request');
exports.removeCache = async(URL) => {
    try{
        // Xóa cache Proxy
        var options = {
            'method': 'GET',
            'url': `https://zphimmoi.tv/purge/${URL}`
        }		
        request(options, function (error, response) {
            if (error) throw new Error(error);
        });
        // Xóa cache Cloudflare zoneid = ABCxyz
        var options = {
            'method': 'POST',
            'url': 'https://api.cloudflare.com/client/v4/zones/ABCxyz/purge_cache',
            'headers': {
                'X-Auth-Email': 'admin@zphimmoi.com',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer SECUREkey'
            },
            body: JSON.stringify({"files":[{"url":URL}]})
        }
        request(options, function (error, response) {
            if (error) throw new Error(error);            
        });
        return true;
    }catch(err){
        console.log(err)
        return false;
    }
}