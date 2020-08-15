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
  if(validateUrl(msg.content)){
    const siteUrl = encodeURI(msg.content);
    getPage(msg, siteUrl);
  }


});

function selectResponder(siteUrl){
  if (siteUrl.startsWith("https://www.d20pfsrd.com/feats/")){
      return feats.featsConfig;
    } else if (siteUrl.startsWith("https://www.d20pfsrd.com/magic/")){
      return magic.magicConfig;
  }
}

function responder(parser, formatter, messageFormatter, response){
    const replyData = parser(response.data);
    const formattedData = formatter(replyData);
    return messageFormatter(formattedData);
}

async function getPage(msg, url){
  let message = "placeholder";
  await axios.get(url).then( (response) => {
      message = responder(...selectResponder(url), response);
    }
    ).catch((error) => {
      console.error(error.message);
    });
  sendMessage(message, msg);

}

function validateUrl(incomingMessage){
  if (incomingMessage.startsWith("https://www.d20pfsrd.com/magic/") || incomingMessage.startsWith("https://www.d20pfsrd.com/feats/")  && !(incomingMessage.endsWith("feats/") && incomingMessage.endsWith("magic/"))){
    return true;
  } else{
    return false;
  }
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
