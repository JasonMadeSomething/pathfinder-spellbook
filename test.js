// Run dotenv

const axios = require("axios")
const cheerio = require('cheerio')



  
  //need to validate the url
  const siteUrl = "https://www.d20pfsrd.com/feats/combat-feats/focused-shot-combat";
  
axios.get(siteUrl).then((response) => {getHeader(response.data)})

function getHeader(data){

  const $ = cheerio.load(data);
  const pagetitle = $('article > h1').text();
  console.log(pagetitle);
}


