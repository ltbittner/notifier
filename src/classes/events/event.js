
var moment = require('moment');

export default class Event {
  constructor(interval, type = 'interval', name) {
    this.interval = interval;
    this.lastChecked = 0;
    this.nextCheck = interval;
    
    this.eventType = type;
    this.eventTime = interval;
    this.name = name;

    this.isActive = true;
    this.id = this.makeid();

    if(type == 'timed') {
      this.setExecution();
    }
  }

  setExecution() {
    if(!this.isActive) return;

    var now = moment();
    
    var then = moment();
    var times = this.eventTime.split(':');
    then.hour(times[0]);
    then.minute(times[1]);
    then.second(times[2]);

    if(now >= then) {
      let day = now.day();
      then.day(day + 1); 
    }

    setTimeout(this.checkEvent.bind(this), then.diff(now));
  }

  //abstract function - must be overridden
  checkEvent() {

  }

  //abstract function - must be overridden
  eventAction() {
  }

  check(time) {
    this.lastChecked += time;

    if(this.lastChecked == this.nextCheck) {
      this.updateNextCheck();
      this.checkEvent();
    }
  }

  updateNextCheck() {
    this.lastChecked = 0;
  }

  makeid()
  {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 5; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
  }
}