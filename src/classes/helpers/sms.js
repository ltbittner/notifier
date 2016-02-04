var config = require('../../../config');

class SMS {
  constructor() {
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

export default new SMS();