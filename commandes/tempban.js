const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const bot = new Discord.Client({disableEveryone: true});
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    let commande = args.shift();
let BUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args.shift()));
if(!BUser) return message.channel.send("Je ne trouve pas l'utilisateur.");
let bantime = args.shift();
let BReason = args.join(" ");
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu peut pas faire ça !");
if(BUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Cette personne ne peut pas être ban !");

if(!bantime) return message.reply("Vous n'avez pas spécifié de temps ! (*tempban @user 1s/m/h/d motif)");
if(!BReason) return message.reply("Vous n'avez pas spécifié de motif ! (*tempban @user 1s/m/h/d motif)");

let banEmbed = new Discord.RichEmbed()
    .setTitle(`~ Ban temporaire ~`)
    .setColor("#ff0000")
    .addField("Joueur", `@${BUser}`, true)
    .addField("Staff", `<@${message.author.id}>`, true)
    .addField("Durée", `${ms(ms(bantime))}`)
    .addField("Motif", BReason)
    .setFooter(`Made by ${botconfig.author} | Version ${botconfig.version}`,);

let banChannel = message.guild.channels.find(`name`, "📜▕-passage-discord");
if(!banChannel) return message.channel.send("Je ne trouve pas le channel !");
await(message.guild.member(BUser).ban(BReason))
banChannel.send(banEmbed);
console.log(`[STAFF] ${BUser.user.tag} a été ban de ${message.guild.name} par ${message.author.tag} pour la raison suivante : ${BReason} (${ms(ms(bantime))}).`)


setTimeout(function(){
    let unbanEmbed = new Discord.RichEmbed()
        .setTitle(`~ Unban ~`)
        .setColor("#008000")
        .addField("Pseudo", `${BUser}`, true)
        .addField("Staff", `@${bot.user.tag}`, true)
        .setFooter(`Made by ${botconfig.author} | Version ${botconfig.version}`,);

    banChannel.send(unbanEmbed);
    message.guild.unban(BUser)
    console.log(`[STAFF] ${BUser.user.tag} n'est plus ban de ${message.guild.name}`)
}, ms(bantime));
}

module.exports.help = {
    name: 'tempban',
    description: 'Permet de bannir temporairemment une personne du discord.',
    usage: 'tempban @pseudo#xxx 1s/m/h/d motif',
};
