import http from 'http';


class CustomHTTP {
    get(host, path) {
        return new Promise((resolve, reject) => {
            var options = {
                host: host,
                port: 80,
                path: path,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            var req = http.request(options, (res) => {
                res.setEncoding('utf8');
                var output = '';
                res.on('data', function (chunk) {
                    output += chunk;
                });

                res.on('end', function() {
                    var obj = JSON.parse(output);
                    resolve(obj);
                });
            });

            req.end();
        });
        
    }
}

export default new CustomHTTP();
     
      