// Run dotenv
require('dotenv').config();
const Discord = require('discord.js');
const axios = require("axios");
const cheerio = require('cheerio');


const client = new Discord.Client();
//initialize bot by connecting to the server
client.login(process.env.DISCORD_TOKEN);

//Bot event listener for a message
client.on('message', msg => {
  
  const siteUrl = encodeURI(msg.content);
  
  if (siteUrl.startsWith("https://www.d20pfsrd.com/feats/")){
    getPage(msg, siteUrl, featResponse);

  } else if (siteUrl.startsWith("https://www.d20pfsrd.com/magic/")){
    getPage(msg, siteUrl, magicResponse);
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

function featResponse(response){ 
    const replyData = parseFeatPage(response.data);
    const formattedData = formatFeatData(replyData);
    return formatMessage(formattedData);
}  

function magicResponse(response){
   const replyData = parseMagicPage(response.data);
   
   console.log(replyData);
}

function parseFeatPage(data){

  const $ = cheerio.load(data);
  const pagetitle = $('article > h1').text();
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
  const pagetitle = $('article  > h1').text();
  const details= $('article > div.row.display-flex > div.article-text > div.page-center > div').children('p');
  const reply = {"Name": pagetitle};
  var x = "Info";
  details.each(function(i){
    if ($(this).hasClass("divider")) {
      x = $(this).text();
    }else{
      reply[x] = $(this).text();
    }
    
  });
  return reply;
}

function formatFeatData(replyData){
  for (var key in replyData){
      if(replyData.hasOwnProperty(key)) {
        if (key == "Name") {
          replyData[key] = "**" + replyData[key] + "**";
        } else {
          replyData[key] = titleType(replyData[key]);
        }
      }
    }
    return replyData;
}

function titleType(title){
  if (title.startsWith("Prerequisite(s):")){
    return title.replace("Prerequisite(s):", "**Prerequisite(s):**");
  }else if(title.startsWith("Prerequisite:")){
    return title.replace("Prerequisite(s):", "**Prerequisite:**");
  }else if(title.startsWith("Prerequisites:")){
    return title.replace("Prerequisites:", "**Prerequisites:**");
  }  else if (title.startsWith("Benefit(s):")){
    return title.replace("Benefit(s):", "**Benefit(s):**");
  }else if (title.startsWith("Benefit:")){
    return title.replace("Benefit:", "**Benefit:**");
  }else if (title.startsWith("Benefits:")){
    return title.replace("Benefits:", "**Benefits:**");
  }else if (title.startsWith("Normal")){
    return title.replace("Normal:", "**Normal:**");
  }else if (title.startsWith("Special")){
    return title.replace("Special:", "**Special:**");
  } else {
    return "_" + title + "_";
  }
}
