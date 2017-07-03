const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const ytdl = require('ytdl-core');
const Queue = require("./DeleteQueue");
const DeleteQueue = new Queue();

const prefix = "//"

var welcomes = {};

function pluck(array){
    return array.map(function(item) { return item ["name"]; });
}

function findUser(user, msg){
  let options = {
    shouldSort: true,
    includeScore: true,
    threshold: 0.4,
    location: 10,
    distance: 100,
    maxPatternLength: 31,
    minMatchCharLength: 1,
    keys: [
      "nickname"
    ]
  };
  const fuse = new Fuse(msg.guild.members.map(x => x), options);
  if (fuse.search(user).length !== 0) {
    return fuse.search(user)[0].item.user;
  } else {
    const options2 = options = {
      keys: [
        "username"
      ]
    };
    const fuse2 = new Fuse(msg.guild.members.map(x => x.user), options2);
    return fuse2.search(user)[0];
  }
}

function hasRole(mem, role){
    if(pluck(mem.roles).includes(role)){
        return true;
    } else {
        return false;
    }
}

client.on('guildCreate', guild => {
    // Private things here xd
});

client.on('ready', () => {
  client.user.setGame(' Loading Modules... ');
  console.log(`Logged in as ${client.user.username}!`);
  //client.user.setGame(`New bot on the block (//help)| Currently on ${client.guilds.size} guilds!` );
  client.user.setGame(// Follow this channel -> "https://www.twitch.tv/heythatisnasty");
})

client.on('message', msg => {

// Functions
  function setWelcome(message, args) {
      if (!msg.member.hasPermission("MANAGE_GUILD")) return;
      let guild = msg.guild;
      welcomes[guild.id] = args;
      msg.channel.send(`Welcome message set to ${args}`);
      console.log(welcomes);
      fs.writeFileSync('./messages.json', JSON.stringify(welcomes), 'utf-8');
  }
  function toggleWelcome(message) {
      if (!msg.member.hasPermission("MANAGE_GUILD")) return;
      welcomes[msg.guild.id] = undefined;
  }
  function sendWelcome(user) {
      if (welcomes[user.guild.id] === undefined) return;
      user.guild.defaultChannel.send(welcomes[user.guild.id].replace("{person}", user));
  }
    
  var args = msg.content.split(/[ ]+/);
    
 // Commands here
    
client.on('guildMemberAdd', member => {
    sendWelcome(member);
  });

client.login('not that dumb');
