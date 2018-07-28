const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

  fs.readdir("./commandes/", (err, files) => {

    if(err) console.log(err);
  
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
      console.log("Aucune commende trouvé !");
      return;
    }

    console.log(`========== Commandes activé ==========`)
    jsfile.forEach((f, i) =>{
      let props = require(`./commandes/${f}`);
      console.log(`[CMD] ${f}`);
      bot.commands.set(props.help.name, props);
      console.log(`============ Informations ============`)
    });
  
  });

bot.on("ready", async () => {
    console.log(`Pseudo du BOT   => ${bot.user.tag}`)
    console.log(`Prefix actuelle => ` + botconfig.prefix);
    console.log(`Auteur          => ${botconfig.author}`);
    console.log(`Version         => ${botconfig.version}`);
    console.log(``);
    console.log(`Utilisateurs    => ${bot.users.size}`);
    console.log(`Channels        => ${bot.channels.size}`);
    console.log(`Serveurs        => ${bot.guilds.size}`);
    console.log(`============ Informations ============`);

    bot.user.setStatus("online");
    bot.user.setActivity(`Actuellement sur ${bot.guilds.size} serveurs`); 
    console.log(``)
    console.log(`        Démarage du bot terminé       `);
    console.log(``)
    console.log(`=========== Début des logs ===========`);
    console.log(``)
});

bot.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`[INFO] Le bot a été ajouté sur un serveur ! => ${guild.name} (id: ${guild.id}). + ${guild.memberCount} membres`);
  bot.user.setActivity(`Actuellement sur ${bot.guilds.size} serveurs`); 
});

bot.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`[INFO] Le bot a été retiré d'un serveur ! => ${guild.name} (id: ${guild.id}). - ${guild.memberCount} membres`);
  bot.user.setActivity(`Actuellement sur ${bot.guilds.size} serveurs`); 
});



bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});

bot.login(process.env.TOKEN);
