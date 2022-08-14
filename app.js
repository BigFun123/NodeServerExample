const fs = require("fs");
const http = require("http");
const axios = require("axios");
const port = 3001;

async function start() {
    const server = http.createServer(function (req, response) {
        response.writeHead(200, { "Content-Type": "text/html" });
        fs.readFile("index.html", async (error, data) => {
            if (error) {
                response.writeHead(404);
            } else {
                response.write(data);
            }
            let res = await testPromise();
            response.write("" + res);
            response.end();
        })
    })

    server.listen(port, function (error) {
        error ? console.error(error) : console.log("listening on port " + port);
    })
}

async function testPromise() {    
    return new Promise(async (resolve, reject) => {
        let result = axios.get("https://google.com")
        .then(response=> {
            resolve("Hello World from a promise " + response.data);
        })
        .catch(error=>console.log(error));        
    }, 2000)
}

start();
