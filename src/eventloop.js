
import BaseEvent from './classes/events/event';
import EmailEvent from './classes/events/custom/weather_event';

let _myLoop = null;

export default class EventLoop {
  constructor() {
    if(!_myLoop) {
      _myLoop = this;
    }

    this.events = [];

    this.interval = 1;

    console.log("Constructing EventLoop");
    
    return _myLoop;
  }

  startLoop () {
    setInterval(this.checkAllEvents.bind(this), (this.interval * 1000));
  }

  checkAllEvents() {
    if(!this.events || this.events.length == 0) return;
      
    for(let e of this.events){
      if(e.eventType == 'interval') {
         e.check(this.interval);
      } 
    }
  }

  compareTimes(time) {
    
  }

  addEvent() {
    if(!this.events) {
      console.log("EVENTS IS NULL"); 
      return;
    }

    let newEvent = new EmailEvent(5);
    this.events.push(newEvent);
    console.log("Added event");
  }


}