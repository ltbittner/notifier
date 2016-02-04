const express = require('express');
const app = express();
import EventLoop from './src/eventloop.js';

let _loop = new EventLoop();
_loop.startLoop();

app.post('/add/timed/', (req, res) => {
  let type = req.params.type;
  let time = req.params.time;

  _loop.addTimedEvent(type, time);
  res.send("Added event");
});

app.post('/add/interval/', (req, res) => {
  let type = req.params.type;
  let time = req.params.time;

  _loop.addIntervalEvent(type, time);
  res.send("Added event"); 
});

app.get('/', (req, res) => {
  res.send("YO");
});

app.listen(3001); 