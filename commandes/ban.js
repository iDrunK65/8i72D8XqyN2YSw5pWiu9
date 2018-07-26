const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let BUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!BUser) return message.channel.send("Je ne trouve pas l'utilisateur.");
    let BReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu peut pas faire ça !");
    if(BUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Cette personne ne peut pas être ban !");
    if(!BReason) return message.reply("Vous n'avez pas spécifié de motif ! (*ban @user motif)");

    let banEmbed = new Discord.RichEmbed()
    .setTitle(`~ Ban ~`)
    .setColor("#ff0000")
    .addField("Joueur", `${BUser}`, true)
    .addField("Staff", `<@${message.author.id}>`, true)
    .addField("Motif", BReason);

    let banChannel = message.guild.channels.find(`name`, "📜▕-passage-discord");
        if(!banChannel) return message.channel.send("Je ne trouve pas le channel !");

    message.guild.member(BUser).ban(BReason);
    banChannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}