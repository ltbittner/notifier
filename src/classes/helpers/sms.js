var client = require('twilio')('ACf09989d073556edc82315f8ecad0f6a8', 'c35f33d5e245184eee12f58071660032');

export default class SMS {
  sendText(to, message) {
    let myNumber = "+15878021879";

    client.sendMessage({
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