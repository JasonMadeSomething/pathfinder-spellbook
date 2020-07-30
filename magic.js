const cheerio = require('cheerio');

function magicResponse(response){
   const replyData = parseMagicPage(response.data);
   const formattedData = formatMagicData(replyData);
   return formatMessage(formattedData);
}


function formatMagicData(replyData){
  for (var key in replyData){
      if(replyData.hasOwnProperty(key)) {
        if (key == "Name") {
          replyData[key] = "__**" + replyData[key] + "**__";
        } else if(key == "Info"){
            replyData[key] = replyData[key].replace("Elemental School","\n**Elemental School:**");
            replyData[key] = replyData[key].replace("School","**School:**");
            replyData[key] = replyData[key].replace("Level","\n**Level:**");
            replyData[key] = replyData[key].replace("Domain","\n**Domain:**");
        } else if(key == "CASTING"){
            replyData[key] = "**CASTING**\n" + replyData[key];
            replyData[key] = replyData[key].replace("Casting Time","**Casting Time:**");
            replyData[key] = replyData[key].replace("Components","\n**Components:**");
        } else if (key == "EFFECT" ){
            replyData[key] = "**EFFECT**\n" + replyData[key];
            replyData[key] = replyData[key].replace("Range","**Range:**");
            replyData[key] = replyData[key].replace("Effect","\n**Effect:**");
            replyData[key] = replyData[key].replace("Duration","\n**Duration:**");
            replyData[key] = replyData[key].replace("Saving Throw","\n**Saving Throw:**");
            replyData[key] = replyData[key].replace("Spell Resistance","\n**Spell Resistance:**");
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
  magicResponse: magicResponse
};