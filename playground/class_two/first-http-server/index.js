const http = require('http');

const server = http.createServer((req,res)=>{
    const {headers, method, url} = req;
   // console.log({headers,method,url});
    
    res.end('YOYO')
})

server.listen(3000,()=>{
    console.log("server UP n RUNNING");
})