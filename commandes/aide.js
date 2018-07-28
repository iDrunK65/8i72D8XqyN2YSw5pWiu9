const Discord = require("discord.js");
const fs = require("fs");
const botconfig = require("../botconfig.json");


module.exports.run = (client, message, params) => {
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

  const msg = new Discord.RichEmbed()

  .setColor('RANDOM')
  .setAuthor('Liste des commandes :')
  .addField(':beginner:  Staff', `${botconfig.prefix}clear\n${botconfig.prefix}tempmute\n${botconfig.prefix}kick\n${botconfig.prefix}tempban\n${botconfig.prefix}ban\n${botconfig.prefix}warn`, true )
  //.addField(':space_invader: Fun', `${botconfig.prefix}`, true)
  .addField(':pager: Utilitaire',`${botconfig.prefix}serveur\n${botconfig.prefix}informations\n${botconfig.prefix}help`, true)
  .addField(':gear: Commandes en DEV',`${botconfig.prefix}profile`, true)
  .setDescription(`Utilisez ${botconfig.prefix}help <commandes> pour plus d'informations !`)
  .setFooter(`Made by ${botconfig.author} | Version ${botconfig.version}`)
  .setTimestamp()

              message.channel.send(msg);

  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);

      const msg2 = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle(`**Commande :** ${command.help.name}`)
      .setDescription(`**Description :** ${command.help.description}\n**Usage :** ${botconfig.prefix}${command.help.usage}\n`)
      .setFooter(`Made by ${botconfig.author} | Version ${botconfig.version}`)
      .setTimestamp()
  message.channel.send(msg2)
    }
      
  }};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0
};

module.exports.help = {
  name: 'aide',
  description: 'Liste des commandes du bot !',
  usage: 'aide [commande]',
};
