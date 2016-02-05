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
  let resp = [];

  for(let e of _loop.events) {
    resp.push({
      id: e.id,
      type: e.name,
      method: e.eventType,
      time: e.eventTime,
      active: e.isActive
    });
  }

  res.send(resp);
})

app.post('/add/timed/', (req, res) => {
  let type = req.body.type;
  let time = req.body.time;
  let options = req.body.options;

  _loop.addTimedEvent(type, time, options);
  res.send("Added event");
});

app.post('/add/interval/', (req, res) => {
  let type = req.body.type;
  let time = req.body.time;
  let options = req.body.options;

  _loop.addIntervalEvent(type, time, options);
  res.send("Added event"); 
});

app.post('/run/', (req, res) => {
  let id = req.body.id;

  for(let e of _loop.events) {
    if(e.id == id) {
      e.checkEvent();
      res.send("success");
      break;
    }
  }
});

app.post('/disable/', (req, res) => {
  let id = req.body.id;

  for(let e of _loop.events) {
    if(e.id == id) {
      e.isActive = false;
      res.send("success");
      break;
    }
  }
});

app.post('/enable/', (req, res) => {
  let id = req.body.id;

  for(let e of _loop.events) {
    if(e.id == id) {
      e.isActive = true;
      res.send("success");
      break;
    }
  }
});

app.post('/delete/', (req, res) => {
  let id = req.body.id;
  let index = 0;
  let deleteIndex = -1;
  for(let e of _loop.events) {
    if(e.id == id) {
      deleteIndex = index;
      break;
    }
    index++;
  }

  if(deleteIndex > -1) {
    _loop.events.splice(deleteIndex, 1);
  } 

  res.send("success"); 
});

app.get('/', (req, res) => {
  _loop.addIntervalEvent('electronic', '5', { 
    itemName: "lightning cable",
    checkForSale: false,
    maxPrice: "40",
    onSale: true
  });   

  res.send("YO"); 
}); 

app.listen(3002); 