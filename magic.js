const cheerio = require('cheerio');

function magicResponse(response){
   const replyData = parseMagicPage(response.data);
   const formattedData = formatMagicData(replyData);
   return formatMessage(formattedData);
}


function formatMagicData(replyData){
  for (var key in replyData){
      if(replyData.hasOwnProperty(key)) {
        /*No newlines is the comprimise between pages that have them embedded and those that don't*/
        if (key == "Name") {
          replyData[key] = "__**" + replyData[key] + "**__";
        } else if(key == "Info"){
            replyData[key] = replyData[key].replace("Elemental School","**Elemental School:**");
            replyData[key] = replyData[key].replace("School","**School:**");
            replyData[key] = replyData[key].replace("Level","**Level:**");
            replyData[key] = replyData[key].replace("Domain","**Domain:**");
        } else if(key == "CASTING"){
            replyData[key] = "**CASTING**\n" + replyData[key];
            replyData[key] = replyData[key].replace("Casting Time","**Casting Time:**");
            replyData[key] = replyData[key].replace("Components","**Components:**");
        } else if (key == "EFFECT" ){
            replyData[key] = "**EFFECT**\n" + replyData[key];
            replyData[key] = replyData[key].replace("Range","**Range:**");
            replyData[key] = replyData[key].replace("Effect","**Effect:**");
            replyData[key] = replyData[key].replace("Target","**Target:**");
            replyData[key] = replyData[key].replace("Duration","**Duration:**");
            replyData[key] = replyData[key].replace("Saving Throw","**Saving Throw:**");
            replyData[key] = replyData[key].replace("Spell Resistance","**Spell Resistance:**");
        } else if (key == "DESCRIPTION"){
            replyData[key] = "**DESCRIPTION**\n" + replyData[key];
        } else {
          console.log(key);
        }
      }
    }
    return replyData;
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


function formatMessage(formattedData){
  var message = formattedData["Name"] + "\n";
  for (var key in formattedData){
    if (key != "Name"){
      message = message + formattedData[key] + "\n";
    }
  }
  return message;
}

module.exports = {
  magicConfig: [parseMagicPage,
                formatMagicData,
                formatMessage]
};