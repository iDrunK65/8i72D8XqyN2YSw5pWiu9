const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const botconfig = require("../botconfig.json");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Tu peux pas faire ça !");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Couldn't find them yo");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Cette personne peut pas recevoir de warn.");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setTitle(`~ Avertissement ~`)
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Pseudo", `${wUser}`, true)
  .addField("Staff", `<@${message.author.id}>`, true)
  .addField("Motif", reason)
  .setFooter(`Made by ${botconfig.author} | Version ${botconfig.version}`);

  let warnchannel = message.guild.channels.find(`name`, "📜▕-passage-discord");
  if(!warnchannel) return message.reply("Couldn't find channel");

  warnchannel.send(warnEmbed);
  console.log(`[STAFF] ${wUser.user.tag} a été avertit de ${message.guild.name} par ${message.author.tag} pour la raison suivante : ${reason}.`)

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "Mute serveur");
    if(!muterole) return message.reply("You should create that role dude.");

    let mutetime = "10m";
    let wmuteEmbed = new Discord.RichEmbed()
    .setTitle(`~ Mute ~`)
    .setColor("#ff0000")
    .addField("Joueur", `${wUser}`, true)
    .addField("Staff", `<@${message.author.id}>`, true)
    .addField("Durée", `${ms(ms(mutetime))}`)
    .addField("Motif", reason + ` (2 warns)`)
    .setFooter(`Made by ${botconfig.author} | Version ${botconfig.version}`,);
    await(wUser.addRole(muterole.id));
    warnchannel.send(wmuteEmbed);
    console.log(`[STAFF] ${wUser.user.tag} a été mute de ${message.guild.name} par ${message.author.tag} pour la raison suivante : ${reason} (${ms(ms(mutetime))}).`)

    setTimeout(function(){
        let WUnmuteEmbed = new Discord.RichEmbed()
        .setTitle(`~ UnMute ~`)
        .setColor("#008000")
        .addField("Pseudo", `${wUser}`, true)
        .addField("Staff", `@${bot.user.tag}`, true)
        .setFooter(`Made by ${botconfig.author} | Version ${botconfig.version}`,);
    
        MUser.removeRole(muterole.id);
        warnchannel.send(WUnmuteEmbed)
        console.log(`[STAFF] ${wUser.user.tag} n'est plus mute de ${message.guild.name}`)
      }, ms(mutetime));
  }
  if(warns[wUser.id].warns == 5){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> has been banned.`)
  }

}

module.exports.help = {
  name: "warn"
}