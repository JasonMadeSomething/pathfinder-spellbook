// Run dotenv

const axios = require("axios")
const cheerio = require('cheerio')



  
  //need to validate the url
  const siteUrl = "https://www.d20pfsrd.com/feats/combat-feats/focused-shot-combat";
  
axios.get(siteUrl).then((response) => {parseFeatPage(response.data)})

function parseFeatPage(data){

  const $ = cheerio.load(data);
  const pagetitle = $('article  > h1').text();
  const details= $('article  > div .article-content').children('p');
  console.log(pagetitle);
  details.each(function(){
    console.log($(this).text());
  });
  


}


