const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    message.delete().catch(O_o=>{});
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**✋ Tu peut pas faire ça ! ✋**").then(msg => msg.delete(5000));
    if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("**✋ Cette personne ne peut pas être kick ! ✋**").then(msg => msg.delete(5000));
    if(!kReason) return message.reply("Vous n'avez pas spécifié de motif ! (*kick @user motif)");


    let kickEmbed = new Discord.RichEmbed()
    .setTitle(`~ Kick ~`)
    .setColor("#ff0000")
    .addField("Joueur", `${kUser}`, true)
    .addField("Staff", `<@${message.author.id}>`, true)
    .addField("Motif", kReason)
    .setFooter(`Made by ${botconfig.author} | Version ${botconfig.version}`)
    .setTimestamp();

    let kickChannel = message.guild.channels.find(`name`, "📜▕-passage-discord");
        if(!kickChannel) return message.channel.send("Je ne trouve pas le channel !");

    kickChannel.send(kickEmbed);
    message.guild.member(kUser).kick(kReason);
    message.channel.send(`:white_check_mark: ${kUser} a été kick. :white_check_mark:`).then(msg => msg.delete(5000));
}

module.exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 0
};
  
module.exports.help = {
    name: 'kick',
    description: 'Permet d\'expulser une personne du discord.',
    usage: 'kick @pseudo#xxxx motif',
};
