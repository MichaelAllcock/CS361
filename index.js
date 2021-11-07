// Setting up use with JSON database file
const fs = require('fs');
const data = fs.readFileSync('parks_2.json');
const parks = JSON.parse(data);
//console.log(parks);

// Setting up express
const { request, response } = require('express');
const express = require('express');
const app = express();

const port = 3000
app.listen(port, () => console.log('Server listening at Port', port));
console.log('Close server with ^C');
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));


//Routes
app.get('/search/:park/', searchParks);

function searchParks(request, response) {
    var input = request.params.park;
    var reply;
    if (parks[input]) {
        reply = parks[input]
    } else {
        reply = {
            status: "not found",
            park: input
        }
    }
    
    response.send(reply);

}

// Send all parks
app.get('/all/', sendAll);

function sendAll(request, response) {
    response.send(parks);
}
