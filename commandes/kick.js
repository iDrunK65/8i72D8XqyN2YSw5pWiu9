const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu peut pas faire ça !");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Cette personne ne peut pas être kick !");
    if(!kReason) return message.reply("Vous n'avez pas spécifié de motif ! (*kick @user motif)");

    let kickEmbed = new Discord.RichEmbed()
    .setTitle(`~ Kick ~`)
    .setColor("#ff0000")
    .addField("Joueur", `${kUser}`, true)
    .addField("Staff", `<@${message.author.id}>`, true)
    .addField("Motif", kReason);

    let kickChannel = message.guild.channels.find(`name`, "📜▕-passage-discord");
        if(!kickChannel) return message.channel.send("Je ne trouve pas le channel !");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

module.exports.help = {
  name:"kick"
}