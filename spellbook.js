require('dotenv').config()
const Discord = require('discord.js')
const axios = require('axios')
const Feats = require('./feats')
const Magic = require('./magic')

const client = new Discord.Client()
client.login(process.env.DISCORD_TOKEN)
const responders = [new Magic(), new Feats()]

client.on('message', getPage)

async function getPage (msg) {
  const url = encodeURI(msg.content)
  const responder = responders.find(responder => responder.match(url))
  if (!responder) {

  }
  else {
    try {
      const response = await axios.get(url)
      const message = responder.format(response)
      msg.channel.send(message)
    } catch (e) {
      console.error(e)
    }
  }
}
