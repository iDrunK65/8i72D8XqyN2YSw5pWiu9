const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let purgeEmbed = new Discord.RichEmbed()
  .setColor("#FF9900")
  .setTitle("~ Purge ~ ")
  .setDescription(`**${args[0]}** messages ont été supprimés !`);

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu peux pas faire ça.");
  if(!args[0]) return message.channel.reply(`Commande incorrect fait ${botconfig.prefix}aide`);
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(purgeEmbed).then(msg => msg.delete(5000));
});

}

module.exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 0
};
  
module.exports.help = {
  name: 'purge',
  description: 'Permet de supprimer un certain nombre de message dans un channel.',
  usage: 'purge <nombre>',
}
