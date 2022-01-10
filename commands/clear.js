const Discord = require('discord.js');

exports.run = function (client, message, args) {
  if (!message.guild) {
    return message.author.send('`clear` command can only be used on servers.');
  }

  let msgCount = parseInt(args.join(' '));

  if (!args[0]) {
    return message.channel.send("Write the amount of the message to be deleted!").then(msg => { msg.delete({ timeout: 2000 }) });
  }

  if (msgCount > 100) {
    return message.channel.send('You cannot delete more than 100 messages!').then(msg => { msg.delete({ timeout: 2000 }) });
  }

  if (msgCount <= 100) {
    let toDelete = msgCount;
    if (toDelete != 100) {
      toDelete = toDelete + 1; //deleting also the command sent
    }
    message.channel.bulkDelete(toDelete).then(() => {
      message.channel.send(msgCount + ' messages have been deleted.').then(msg => {
        msg.delete({ timeout: 2000 })
      });
    }).catch(err => {
      if (err.code === 50013) {
        message.channel.send("I don't have permission to delete messages in this channel!");
        return;
      }
      console.log(err);
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['clear'],
  permLevel: 2
};

exports.help = {
  name: 'clear',
  description: 'Deletes the specified amount of messages.',
  usage: 'clear <count>'
};
