var config = require('../../../config');

export default class SMS {
  constructor() {
    console.log(config.twilioKey);
    this.client = require('twilio')(config.twilioKey, config.twilioAuth);
  }
  sendText(to, message) {
    let myNumber = "+15878021879";

    this.client.sendMessage({
      to: to,
      from: myNumber,
      body: message
    }, (err, resp) => {
        if(!err) {
          console.log("SENT TEXT");
        } else {
          console.log(err);
        }
    });
  }
}