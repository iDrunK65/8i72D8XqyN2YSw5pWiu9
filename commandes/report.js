const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Impossible de trouver l'utilisateur.");
    let rreason = args.join(" ").slice(22);
    if(!rreason) return message.channel.send("Il faut un motif !");

    let reportEmbed = new Discord.RichEmbed()
    .setTitle("~ Signalement ~") 
    .setColor("#15f153")
    .addField("Joueur signalé", `${rUser}`,true)
    .addField("Signalé par", `${message.author}`, true)
    .addField("Signalé à", new Date())
    .addField("Channel du report", message.channel)
    .addField("Motif", rreason)
    .setFooter(`Made by ${botconfig.author} | Version ${botconfig.version}`)
    .setTimestamp();

    let reportschannel = message.guild.channels.find(`name`, "report");
    if(!reportschannel) return message.channel.send("Je ne trouve pas le channel de signalement !");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);
    message.author.send("Ton signalemment a bien été envoyé.")
    console.log(`[STAFF] ${rUser.user.tag} a été signalé de ${message.guild.name} par ${message.author.tag} pour la raison suivante : ${rreason}.`)

}
 
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0
};

module.exports.help = {
  name: 'report',
  description: 'Permet de signaler une personne du discord.',
  usage: 'report @pseudo#xxxx motif',
};
