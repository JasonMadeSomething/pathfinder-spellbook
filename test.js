// Run dotenv

const axios = require("axios");
const cheerio = require('cheerio');



  
//need to validate the url
const siteUrl = "https://www.d20pfsrd.com/feats/combat-feats/improved-grapple-combat/";
  
  
axios.get(siteUrl).then((response) => { const replyData = parseFeatPage(response.data);
    const formattedData = formatFeatData(replyData);
    
    const message = formatMessage(formattedData);
    
    console.log(message);
  });

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
              replyData[key] = replyData[key].replace("**Benefit:", "**Benefit**:");
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

function formatMessage(formattedData){
  var message = formattedData["Name"] + "\n";
  for (var key in formattedData){
    if (key != "Name"){
      message = message + formattedData[key] + "\n";
    }
  }
  return message;
}