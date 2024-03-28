const Discord = require("discord.js-selfbot-v13")
const sphinx = require("sphinx-self");
const keep_alive = require("./keep_alive.js");
const tokens = process.env["token"].split("**")
const clients = [];
for (const token of tokens) {
  
const client = new Discord.Client({checkUpdate: false})
new sphinx.Core(client).leveling({ channel: "1220830635422253220", randomLetters: true, type: 'ar', time: 360000 }) //hover for options

client.login(token) //Not saved.
}  
