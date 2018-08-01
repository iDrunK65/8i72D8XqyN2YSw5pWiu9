const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const bot = new Discord.Client({disableEveryone: true});

module.exports.run = async (bot, message, args) => {
  var s = (Math.round(bot.uptime / 1000) % 60)
  var m = (Math.round(bot.uptime / (1000 * 60)) % 60)
  var h = (Math.round(bot.uptime / (1000 * 60 * 60)))
  var days = (Math.round(bot.uptime / (1000 * 60 * 60 * 24)));
  h = (h < 10)? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;
  let uptime = `${days}D ${h}H ${m}M ${s}S`;
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

