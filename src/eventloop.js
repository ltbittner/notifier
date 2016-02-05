
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
      if(e.eventType == 'interval' && e.isActive) {
         e.check(this.interval);
      } 
    }
  }

  compareTimes(time) {
    
  }

  addTimedEvent(type, time) {
    switch (type) {
      case 'rain':
          let newEvent = new EmailEvent(time, 'timed','Rain');
          this.events.push(newEvent);
        break;
      default:
        
        break;
    }
    console.log(`added ${type} event`);
  }

  addIntervalEvent(type, interval) {
    switch (type) {
      case 'rain':
          let newEvent = new EmailEvent(interval, 'interval', "Rain");
          this.events.push(newEvent);
        break;
      default:
        
        break;
    }
    console.log(`added ${type} event`);
  }
}