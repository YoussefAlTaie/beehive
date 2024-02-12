const Discord = require("discord.js-selfbot-v13")
const sphinx = require("sphinx-self");
const keep_alive = require("./keep_alive.js");
const fs = require("fs"); // to read and write files
const tokens = process.env["token"].split("**")
const clients = [];
const fileName = "tokens.txt"; // the name of the file to save tokens

// a function to check if a token is valid
function isValidToken(token) {
  return new Promise((resolve, reject) => {
    const client = new Discord.Client({checkUpdate: false});
    client.on("ready", () => {
      resolve(true); // the token is valid
      client.destroy(); // close the connection
    });
    client.on("error", (error) => {
      resolve(false); // the token is invalid
      client.destroy(); // close the connection
    });
    client.login(token); // try to login with the token
  });
}

// a function to write a token and a client name to the file
function writeToken(token, name) {
  return new Promise((resolve, reject) => {
    fs.appendFile(fileName, `${token} ${name}\n`, (error) => {
      if (error) reject(error); // something went wrong
      else resolve(); // the token and name are written
    });
  });
}

// a function to loop through the tokens and save the valid ones
async function saveTokens() {
  for (const token of tokens) {
    const valid = await isValidToken(token); // check if the token is valid
    if (valid) {
      const client = new Discord.Client({checkUpdate: false});
      new sphinx.Core(client).leveling({ channel: "1187808730440540294", randomLetters: true, type: 'ar', time: 60000 }); // hover for options
      client.login(token); // login with the token
      clients.push(client); // add the client to the array
      const name = client.user.username; // get the client name
      await writeToken(token, name); // write the token and name to the file
    }
  }
}

// create the file if it does not exist
fs.open(fileName, "a", (error, fd) => {
  if (error) throw error; // something went wrong
  fs.close(fd, (error) => {
    if (error) throw error; // something went wrong
    saveTokens(); // start saving the tokens
  });
});
