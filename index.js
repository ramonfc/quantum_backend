let app = require('./app');
let http = require('http');
let port = normalizePort(process.env.PORT || 5000);

app.set('port',port);

let server = http.createServer(app);

server.listen(port,"",()=>{
    console.log("Server is listening: ", port);
});

function normalizePort(val){
    let port = parseInt(val,10);
    if(isNaN(port)){
        return val;
    }
    if(port > 0){
        return val;
    }

    return false;
};