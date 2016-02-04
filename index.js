let express = require('express');
let app = express();
import EventLoop from './src/eventloop.js';

let _loop = new EventLoop();
_loop.startLoop();

app.get('/', (req, res) => {
  _loop.addEvent();
  res.send("Added event");
});

app.listen(3000);