var Mailgun = require('mailgun').Mailgun;
var config = require('../../../config');
// Simple mailgun sending class
// Create a mailgun account and enter you API key below and the rest should work
class Email {
  sendEmail(to, from, subject, message) {
    let mg = new Mailgun(config.mailKey);
    mg.sendText(from, to, subject, message);
  }
}  

export default new Email();