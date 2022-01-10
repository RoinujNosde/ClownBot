const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let msg = args.slice(0).join(' ');
  if (msg.length < 1) return message.reply('You have to write anything for me to write.');
    message.delete();
    message.channel.send(msg);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['say'],
  permLevel: 3
};

exports.help = {
  name: 'write',
  description: 'It prints what you want to the bot.',
  usage: 'write <message>'
};
