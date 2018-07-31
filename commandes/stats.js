const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const bot = new Discord.Client({disableEveryone: true});

module.exports.run = async (bot, message, args) => {
  let totalSeconds = (bot.uptime/1000);
   let days = Math.floor(totalSeconds / 86400);
   totalSeconds %= 86400;
   let hours = Math.floor(totalSeconds / 3600);
   totalSeconds %= 3600;
   let minutes = Math.floor(totalSeconds / 60);
   let seconds = Math.round(totalSeconds % 60);
   let uptime = `${days}D ${hours}H ${minutes}M ${seconds}S`;
   let botembed = new Discord.RichEmbed()
    .setTitle("Information du bot")
    .setColor("#15f153")
    .addField(":space_invader: Nom du bot", bot.user.username, true)
    .addField(":id: ID", bot.user.id, true)
    .addField(":bust_in_silhouette: Auteur", `${botconfig.author}`, true)
    .addField(":desktop: Serveurs", `${bot.guilds.size} serveurs`, true)
    .addField(":dividers: Channel", `${bot.channels.size} channels`, true)
    .addField(":busts_in_silhouette: Utilisateurs", `${bot.users.size} utilisateurs`,true)
    .addField('\u200B', '\u200B')
    .addField(":tools: Version", `${botconfig.version}`,true)
    .addField(":books: library", `${botconfig.library}`,true)
    .addField(":stopwatch: Uptime", `${uptime}`,true)
    .addField(":exclamation:  Prefix", `Préfix => **${botconfig.prefix}**`,false)
    .setFooter(`Made by ${botconfig.author} | Version ${botconfig.version}`) 
    .setTimestamp();

    message.channel.send(botembed);
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0
};

module.exports.help = {
  name: 'stats',
  description: 'Affiche toutes les informations du bot.',
  usage: 'stats',
};

