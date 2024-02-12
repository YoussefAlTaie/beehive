const fs = require("fs");
const Discord = require("discord.js-selfbot-v13");
const sphinx = require("sphinx-self");
const keep_alive = require("./keep_alive.js");
const tokens = process.env["token"].split("**");
const clients = [];

// Function to write tokens to a text file
function writeTokensToFile(clientName, token) {
  fs.appendFile("tokens.txt", `${clientName}: ${token}\n`, (err) => {
    if (err) {
      console.error("Error writing token to file:", err);
    } else {
      console.log(`Token for ${clientName} written to file.`);
    }
  });
}

// Function to handle login for each token
function handleLogin(token, clientName) {
  const client = new Discord.Client({ checkUpdate: false });
  new sphinx.Core(client).leveling({ channel: "1187808730440540294", randomLetters: true, type: 'ar', time: 60000 }); //hover for options

  client.login(token)
    .then(() => {
      console.log(`${clientName} logged in successfully.`);
      writeTokensToFile(clientName, token);
    })
    .catch((error) => {
      console.error(`Error logging in for ${clientName}:`, error);
    });
}

// Loop through tokens and login for each
tokens.forEach((token, index) => {
  const clientName = `Client_${index + 1}`;
  handleLogin(token, clientName);
});
