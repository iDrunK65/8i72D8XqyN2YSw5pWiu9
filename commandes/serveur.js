const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Nom du serveur", message.guild.name, true)
    .addField("ID du serveur", message.guild.id, true)
    .addField("Créateur", message.guild.owner)
    .addField("Membres", message.guild.memberCount)
    .addField("Création", message.guild.createdAt)
    .setFooter(`Made by ${botconfig.author} | Version ${botconfig.version}`)
    

    message.channel.send(serverembed);
}

module.exports.help = {
  name:"serveur"
}