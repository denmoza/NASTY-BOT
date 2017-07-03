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

// For detecting if the user have a specific role
function hasRole(mem, role){
    if(pluck(mem.roles).includes(role)){
        return true;
    } else {
        return false;
    }
}
