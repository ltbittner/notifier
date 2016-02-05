const express = require('express');
const app = express();
import EventLoop from './src/eventloop.js';
import BodyParser from 'body-parser';


let _loop = new EventLoop();
_loop.startLoop();

app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json());

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/all', (req, res) => {

})

app.post('/add/timed/', (req, res) => {
  let type = req.body.type;
  let time = req.body.time;

  _loop.addTimedEvent(type, time);
  res.send("Added event");
});

app.post('/add/interval/', (req, res) => {
  let type = req.body.type;
  let time = req.body.time;

  _loop.addIntervalEvent(type, time);
  res.send("Added event"); 
});

app.get('/', (req, res) => {
  res.send("YO");
}); 

app.listen(3001); 