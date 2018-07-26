const Discord = require("discord.js");
const fs = require("fs");
const botconfig = require("../botconfig.json");


module.exports.run = async (bot, message, args) => {
    const embed = {
        "title": `Préfix du bot => ${botconfig.prefix}`,
        "description": "",
        "url": "",
        "color": 2734693,
        "timestamp": new Date(),
        "footer": {
          "icon_url": "https://cdn.discordapp.com/avatars/193758355708182529/2d66b3cce534febf468ddf8463b10973.png",
          "text": `Made by ${botconfig.author} | Version ${botconfig.version}`
        },
        "thumbnail": {
          "url": "https://cdn0.iconfinder.com/data/icons/website-design-4/467/Search_icon-128.png"
        },
        "author": {
          "name": "iRobot > Aide",
          "url": "http://idrunk.byethost32.com/",
          "icon_url": "https://cdn.discordapp.com/avatars/193758355708182529/2d66b3cce534febf468ddf8463b10973.png"
        },
        "fields": [
          {
            "name": `:video_game: ${botconfig.prefix}jeux`,
            "value": "Liste des jeux",
            "inline": true
          },
          {
            "name": `:space_invader: ${botconfig.prefix}fun`,
            "value": "CMD fun",
            "inline": true
          },
          {
            "name": `:beginner: ${botconfig.prefix}utilitaire`,
            "value": "CMD utilitaire",
            "inline": true
          },
          {
            "name": `:headphones: ${botconfig.prefix}musique`,
            "value": "CMD musique",
            "inline": true
          },
          {
            "name": `:beginner: ${botconfig.prefix}staff`,
            "value": "CMD staff",
            "inline": true
          },
        ]
      };
      message.channel.send({ embed });
    console.log(`[CMD] ${botconfig.prefix}aide a été éffectué.`)

}

module.exports.help = {
    name:"aide"
}