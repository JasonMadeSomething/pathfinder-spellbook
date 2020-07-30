const cheerio = require('cheerio');

function featResponse(response){ 
    const replyData = parseFeatPage(response.data);
    const formattedData = formatFeatData(replyData);
    return formatFeatMessage(formattedData);
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

function formatFeatMessage(formattedData){
  var message = formattedData["Name"] + "\n";
  for (var key in formattedData){
    if (key != "Name"){
      message = message + formattedData[key] + "\n";
    }
  }
  return message;
}

function titleType(title){
  if (title.startsWith("Prerequisite(s):")){
    return title.replace("Prerequisite(s):", "**Prerequisite(s):**");
  }else if(title.startsWith("Prerequisite:")){
    return title.replace("Prerequisite(s):", "**Prerequisite:**");
  }else if(title.startsWith("Prerequisites:")){
    return title.replace("Prerequisites:", "**Prerequisites:**");
  }else if (title.startsWith("Benefit(s):")){
    return title.replace("Benefit(s):", "**Benefit(s):**");
  }else if (title.startsWith("Benefit:")){
    return title.replace("Benefit:", "**Benefit:**");
  }else if (title.startsWith("Benefits:")){
    return title.replace("Benefits:", "**Benefits:**");
  }else if (title.startsWith("Normal")){
    return title.replace("Normal:", "**Normal:**");
  }else if (title.startsWith("Special")){
    return title.replace("Special:", "**Special:**");
  }else {
    return "_" + title + "_";
  }
}

module.exports = {
  featResponse: featResponse
  
};