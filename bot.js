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
  
  axios.get(siteUrl).then((response) => { getHeader(response.data)
  });

  function parsePage(data){

  const $ = cheerio.load(data);
  const pagetitle = $('article > h1').text();
  const description = $('article > div .article-content > p > i').text();
  console.log(pagetitle);
  
  
}


});
