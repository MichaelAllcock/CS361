// Setting up use with JSON database file
const fs = require('fs');
const data = fs.readFileSync('parks_2.json');
const parks = JSON.parse(data);
//console.log(parks);

// Setting up express
const { request, response } = require('express');
const express = require('express');
const app = express();

// Setting up cors for API use by client
const cors = require('cors');
const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
}

const port = 8050
app.listen(port, () => console.log('http://flip2.engr.oregonstate.edu:/', port));
console.log('Close server with ^C');
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

app.use(cors());


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
