const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const bot = new Discord.Client({disableEveryone: true});
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
let commande = args.shift();
let MUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args.shift()));
if(!MUser) return message.channel.send("Je ne trouve pas l'utilisateur.");
let mutetime = args.shift();
let MReason = args.join(" ");
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu peut pas faire ça !");
if(MUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Cette personne ne peut pas être ban !");

if(!mutetime) return message.reply("Vous n'avez pas spécifié de temps ! (*tempban @user 1s/m/h/d motif)");
if(!MReason) return message.reply("Vous n'avez pas spécifié de motif ! (*tempban @user 1s/m/h/d motif)");

  let muterole = message.guild.roles.find(`name`, "Mute serveur");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Mute serveur",
        color: "#000001",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end 

  let muteEmbed = new Discord.RichEmbed()
    .setTitle(`~ Mute ~`)
    .setColor("#ff0000")
    .addField("Joueur", `@${MUser}`, true)
    .addField("Staff", `<@${message.author.id}>`, true)
    .addField("Durée", `${ms(ms(mutetime))}`)
    .addField("Motif", MReason)
    .setFooter(`Made by ${botconfig.author} | Version ${botconfig.version}`,);

    let muteChannel = message.guild.channels.find(`name`, "📜▕-passage-discord");
    if(!muteChannel) return message.channel.send("Je ne trouve pas le channel !");
    await(MUser.addRole(muterole.id));
    muteChannel.send(muteEmbed);
    console.log(`[STAFF] ${MUser.user.tag} a été mute de ${message.guild.name} par ${message.author.tag} pour la raison suivante : ${MReason} (${ms(ms(mutetime))}).`)

  setTimeout(function(){
    let unMuteEmbed = new Discord.RichEmbed()
    .setTitle(`~ UnMute ~`)
    .setColor("#008000")
    .addField("Pseudo", `${MUser}`, true)
    .addField("Staff", `${bot.user.tag}`, true)
    .setFooter(`Made by ${botconfig.author} | Version ${botconfig.version}`,);

    MUser.removeRole(muterole.id);
    muteChannel.send(unbanEmbed)
    console.log(`[STAFF] ${MUser.user.tag} n'est plus mute de ${message.guild.name}`)
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "tempmute"
}
