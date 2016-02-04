var Mailgun = require('mailgun').Mailgun;

// Simple mailgun sending class
// Create a mailgun account and enter you API key below and the rest should work
export default class Email {
  sendEmail(to, from, subject, message) {
    let mg = new Mailgun('key-fab447f91ba0d483b9a78f01bb16756a');
    mg.sendText(from, to, subject, message);
  }
}  