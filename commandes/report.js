const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Impossible de trouver l'utilisateur.");
    let rreason = args.join(" ").slice(22);
    if(!rreason) return message.channel.send("Il faut un motif !");

    let reportEmbed = new Discord.RichEmbed()
    .setTitle("Signalement") 
    .setColor("#15f153")
    .addField("Joueur signalé", `${rUser} (ID: ${rUser.id})`)
    .addField("Signalé par", `${message.author} (ID: ${message.author.id})`)
    .addField("Signalé à", message.createdAt)
    .addField("Motif", rreason);

    let reportschannel = message.guild.channels.find(`name`, "report");
    if(!reportschannel) return message.channel.send("Je ne trouve pas le channel de signalement !");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

}
 
module.exports.help = {
  name: "report"
}