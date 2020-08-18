// Run dotenv
require('dotenv').config()
const Discord = require('discord.js')
const axios = require('axios')
const Feats = require('./feats')
const Magic = require('./magic')
const client = new Discord.Client()
// initialize bot by connecting to the server
client.login(process.env.DISCORD_TOKEN)

const baseUrl = 'https://www.d20pfsrd.com/'
const responders = [new Magic(), new Feats()]
// Bot event listener for a message
client.on('message', handleMessage)

async function handleMessage (msg) {
  if (validateUrl(msg.content)) {
    const siteUrl = encodeURI(msg.content)
    const message = await getPage(siteUrl)
    msg.channel.send(message)
  }
}

async function getPage (url) {
  const responder = responders.find(responder => responder.match(url))
  try {
    const response = await axios.get(url)
    const message = responder.format(response)
    return message
  } catch (e) {
    console.error(e)
  }
}

function validateUrl (incomingMessage) {
  if ((incomingMessage.startsWith(baseUrl + 'magic/') || incomingMessage.startsWith(baseUrl + 'feats/')) && !(incomingMessage.endsWith('feats/') && incomingMessage.endsWith('magic/'))) {
    return true
  } else {
    return false
  }
}
