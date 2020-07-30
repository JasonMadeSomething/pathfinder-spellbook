// Run dotenv
require('dotenv').config();
const Discord = require('discord.js');
const axios = require("axios");
const feats = require("./feats");
const magic = require("./magic");
const client = new Discord.Client();
//initialize bot by connecting to the server
client.login(process.env.DISCORD_TOKEN);

//Bot event listener for a message
client.on('message', msg => {
  
  /*Need to validate the incoming message*/
  
  const siteUrl = encodeURI(msg.content);
  
  if (siteUrl.startsWith("https://www.d20pfsrd.com/feats/")){
    getPage(msg, siteUrl, feats.featResponse);

  } else if (siteUrl.startsWith("https://www.d20pfsrd.com/magic/")){
    getPage(msg, siteUrl, magic.magicResponse);
  }

});

async function getPage(msg, url, parser){
  let message = "placeholder";
  await axios.get(url).then( (response) => {
      message = parser(response);
    } 
    ).catch((error) => {
      console.error(error.message);
    });
  sendMessage(message, msg);
  
}

function sendMessage(message, msg){
    try {
      if (message === "" || typeof message === undefined){
        throw "Can't Send an empty message";
      }else {
        msg.channel.send(message);
      }
      
    } catch (e) {
      console.error(e);
    }
      
}
