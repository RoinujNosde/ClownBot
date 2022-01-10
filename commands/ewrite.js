const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let msg = args.slice(0).join(' ');
  if (msg.length < 1) return message.reply('You have to write anything for me to write.');
    message.delete();
	const embed = new Discord.MessageEmbed()
	.setColor('RANDOM')
	.setDescription(`${msg}`)
    return message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'ewrite',
  description: 'It prints what you want as an embed to the bot.',
  usage: 'ewrite <mesaj>'
};
