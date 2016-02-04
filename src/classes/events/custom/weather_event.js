import Event from '../event';
import Email from '../../helpers/email';
import SMS from '../../helpers/sms';

import CustomHTTP from '../../helpers/http';

export default class WeatherEvent extends Event {
  constructor(interval, type, time) {
    super(interval, type, time);
    this.http = new CustomHTTP();
    this.email = new Email();
    this.sms = new SMS();
  }

  //Do a function in here - if it passes, call this.eventAction();
  checkEvent() {
    if(this.eventType == 'timed') {
      this.setExecution()
    }
    this.checkWeather(); 
  }

  checkWeather() {
    let cityID = "6173331";
    let apiKey = "80960c5a48f24311f00905ad48303d47";
    let i = this.http.get('api.openweathermap.org', '/data/2.5/forecast?id=' + cityID + '&appid=' + apiKey);
    i.then((resp) => {
      var whenWillItRain = "Not going to rain today! (Hopefully)";

      for(var i = 0; i < 3; i++) {
        var rain = resp.list[0].weather[0].main;
        rain = rain.toLowerCase();
        console.log("RAIN: " + rain);
        if(rain.indexOf('rain') > -1) {
          whenWillItRain = "ITS GON RAIN IN " + (i*3+3) + " HOURS";
          break;
        }
      } 

      this.eventAction(whenWillItRain); 
      console.log(whenWillItRain);
    
    })
    .catch((error) => {
      console.log(error);
    });
  }

  //function to call when event passes
  eventAction(message) { 
    console.log("EVENT ACTION");
    this.email.sendEmail(['logan@thinkingbox.ca'], 'noreply@notify.com', 'Weather report!', message);
    //this.sms.sendText('+14038779943', message);
  }


}