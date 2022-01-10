const Discord = require('discord.js');
const fs = require('fs');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {

  if(message.author.bot) return;
  if(!args[0]){
  const channel = settings.rrchannelid;
  const rolept = message.guild.roles.cache.find(role => role.name === "Portuguese");
  const roleru = message.guild.roles.cache.find(role => role.name === "Russian");
  const roletr = message.guild.roles.cache.find(role => role.name === "Turkish");

  const flagpt = '🇵🇹';
  const flagru = '🇷🇺';
  const flagtr = '🇹🇷';

  let embed = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('Language Selection!')
      .setDescription('Click on the reaction to choose your language.\n\n'
          + `${flagpt} for Portuguese\n`
          + `${flagru} for Pусский\n`
          + `${flagtr} for Türkçe`);

  let messageEmbed = await message.channel.send(embed);
  messageEmbed.react(flagpt);
  messageEmbed.react(flagru);
  messageEmbed.react(flagtr);
  let newid = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
	newid.rrmessageid = messageEmbed.id;
  fs.writeFileSync('settings.json', JSON.stringify(newid));
}
if(args[0].toLowerCase() === "messageid"){
			let content = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
			content.rrmessageid = args[1];
			fs.writeFileSync('settings.json', JSON.stringify(content));
			message.channel.send("Messageid adjusted.").then(message => {message.delete({ timeout: 5000 })});
}
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['rr'],
  permLevel: 2
};

exports.help = {
  name: 'reactionrole',
  description: '',
  usage: 'reactionrole'
};