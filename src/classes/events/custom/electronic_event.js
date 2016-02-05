import Event from '../event';
import Email from '../../helpers/email';
import SMS from '../../helpers/sms';

import CustomHTTP from '../../helpers/http';
var config = require('../../../../config');

export default class ElectronicEvent extends Event {
  constructor(interval, type, name) {
    super(interval, type, name);

    this.itemName;
    this.checkForSale;
    this.maxPrice;
    this.urlList = [];
    this.relevancyArray = [];
    this.onSale = false;
  }
 
  //Do a function in here - if it passes, call this.eventAction();
  checkEvent() {
    if(this.eventType == 'timed') {
      this.setExecution()
    }

    this.checkBestBuy();
  }

  checkBestBuy() {
    let getParams = "/v1/products";

    let keywords = this.itemName.split(' ');
    let str = "";

    for(let o of keywords) {
      str += `search=${o}&`;
    }

    if(this.onSale){
      str += "onSale=true&";
    }

    str = str.substring(0, str.length - 1);

    getParams += `(${str})?format=json`; 
    
    getParams += "&show=salePrice,onSale,name,url"; 
    getParams += "&apiKey=" + config.bestBuyKey;

    let i = CustomHTTP.get('api.bestbuy.com', getParams);
 
    i.then((resp) => { 
      for(let item of resp.products) { 
        if(parseFloat(item.salePrice) <= parseFloat(this.maxPrice)) {
          this.urlList.push(item);
        }
      }
 
      if(this.urlList.length > 0) {
        this.generateRelevancyArray();
      }  
    })
    .catch((err) => { 
      console.log(err);
    });
  }

  generateRelevancyArray() {
    for(let product of this.urlList) {
      let obj = product;
      obj.relevancy = this.getRelevancy(obj.name);
      this.relevancyArray.push(obj); 
    }
  
    this.relevancyArray.sort((a, b) => {
      return parseFloat(a.relevancy) < parseFloat(b.relevancy);
    });

    this.relevancyArray.splice(3);

    if(this.relevancyArray.length > 0) {
      this.eventAction();
    }
  }

 
  getRelevancy(name) { 
    let score = 0;
    let split = this.itemName.split(' ');
    let splitName = name.split(' ');
 
    if(name == this.itemName) { 
      score += 5;
    }

    for(let word of split) {
      for(let word2 of splitName) {
        if(word.toLowerCase() == word2.toLowerCase()) {
          score += 2;
        } 

        if(word.indexOf(word2) > -1) {
          score += 1;
        } 
      }
    } 

    return score;
  }

  //function to call when event passes
  eventAction(message) { 
    console.log("EVENT ACTION - ELECTRONICS");
    let m;
    if(this.onSale){
     m = `Hey! Here is some sale items related to ${this.itemName} under $${this.maxPrice} \n\n`;
    } else {
      m = `Hey! Here is some items related to ${this.itemName} under $${this.maxPrice} \n\n`;
    }
    

    for(let a of this.relevancyArray) {
      m += `${a.url}\n`;
    }
    Email.sendEmail(['logan@thinkingbox.ca'], 'notifier@notifier.com', 'Price report', m);

    this.urlList = []; 
    //SMS.sendText('+14038779943', message);
  } 
 

}