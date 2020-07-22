// Run dotenv
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require("axios");
const cheerio = require('cheerio');

//initialize bot by connecting to the server
client.login(process.env.DISCORD_TOKEN);

client.on('message', msg => {
  
  const siteUrl = msg.content;
  var message = msg.content;
  if (siteUrl.startsWith("https://www.d20pfsrd.com/feats/")){
    axios.get(siteUrl).then( (response) => {
      message = featResponse(response);
      sendMessage(message);
    } 
    ).catch((error) => {
      console.log(error);
    });
  } else if ("https://www.d20pfsrd.com/magic/"){
    //Write the axios call where parsing the paizo pages is a NAMED callback function.
    axios.get(siteUrl).then((response)=> {
      message = parseMagicPage(response)
      console.log(message);
    })
  }

function sendMessage(message){
    msg.channel.send(message);
}

});

function featResponse(response){ 
    const replyData = parseFeatPage(response.data);
    const formattedData = formatFeatData(replyData);
    return formatMessage(formattedData);
}  


function parseFeatPage(data){

  const $ = cheerio.load(data);
  const pagetitle = $('article  > h1').text();
  const details= $('article  > div .article-content').children('p');
  const reply = {"Name": pagetitle};
  details.each(function(i){
    reply["line"+i] = $(this).text();
  });
  return reply;
}

function formatMessage(formattedData){
  var message = formattedData["Name"] + "\n";
  for (var key in formattedData){
    if (key != "Name"){
      message = message + formattedData[key] + "\n";
    }
  }
  return message;
}

function parseMagicPage(data){
  const $ = cheerio.load(data);
  const pagetitle = $('article .magic  > h1').text();
  const details= $('article .magic > div .article-content').children('p');
  const reply = {"Name": pagetitle};
  var x = "Info";
  details.each(function(i){
    if ($(this).hasClass("divider")) {
      x = $(this).text()
    }else{
      reply[x] = $(this).text();
    }
    
  });
  return reply;
}

function formatFeatData(replyData){
  for (var key in replyData){
      if(replyData.hasOwnProperty(key)) {
        if (replyData[key].startsWith("Prerequisite")
        || replyData[key].startsWith("Benefit")
        || replyData[key].startsWith("Special")
        || replyData[key].startsWith("Normal")
        ){
          replyData[key] = "**" + replyData[key];
          if (replyData[key].startsWith("**Prerequisite")){
              if (replyData[key].startsWith("**Prerequisite(s):")) {
                replyData[key] = replyData[key].replace("**Prerequisite(s):", "**Prerequisite(s)**:");
              } else {
                replyData[key] = replyData[key].replace("**Prerequisite:", "**Prerequisite**:");
              }
          } else if (replyData[key].startsWith("**Benefit")){
            if (replyData[key].startsWith("**Benefit")) {
                replyData[key] = replyData[key].replace("**Benefit(s):", "**Benefit(s)**:");
              } else {
                replyData[key] = replyData[key].replace("**Benefit:", "**Benefit**:");
              }
              
          } else if (replyData[key].startsWith("**Special")){
              replyData[key] = replyData[key].replace("**Special:", "**Special**:");
          } else if (replyData[key].startsWith("**Normal")){
              replyData[key] = replyData[key].replace("**Normal:", "**Normal**:");
          }
        } else if (key == "Name") {
          replyData[key] = "**" + replyData[key] + "**";
        } else {
          replyData[key] = "_" + replyData[key] + "_";
        }
      }
    }
    
    return replyData;
}