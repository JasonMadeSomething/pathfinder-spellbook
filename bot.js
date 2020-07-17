// Run dotenv
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require("axios");
const cheerio = require('cheerio');

//initialize bot by connecting to the server
client.login(process.env.DISCORD_TOKEN);

client.on('message', msg => {
  
  //need to validate the url
  const siteUrl = msg.content;
  
  axios.get(siteUrl).then((response) => { const replyData = parseFeatPage(response.data);
    for (var key in replyData){
      if(replyData.hasOwnProperty(key)) {
        if (replyData[key].startsWith("Prerequisite")
        || replyData[key].startsWith("Benefit")
        || replyData[key].startsWith("Special")
        || replyData[key].startsWith("Normal")
        ){
          replyData[key] = "**" + replyData[key];
          if (replyData[key].startsWith("Prerequisite")){
              replyData[key].replace("**Prerequisite(s):", "**Prerequisite(s)**:");
          } else if (replyData[key].startsWith("Benefit")){
              replyData[key].replace("**Benefit:", "**Benefit**:");
          } else if (replyData[key].startsWith("Special")){
              replyData[key].replace("**Special:", "**Special**:");
          } else if (replyData[key].startsWith("Normal")){
              replyData[key].replace("**Normal:", "**Normal**:");
          }
        } else if (key == "Name") {
          replyData[key] = "**" + replyData[key] + "**";
        } else {
          replyData[key] = "_" + replyData[key] + "_";
        }
        
      }
      
    }
  });

function parseFeatPage(data){

  const $ = cheerio.load(data);
  const pagetitle = $('article  > h1').text();
  const details= $('article  > div .article-content').children('p');
  const reply = {"Name": pagetitle};
  details.each(function(i){
    reply["line"+i] = $(this).text();
  });
  return (reply);
}


});

