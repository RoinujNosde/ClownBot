const Discord = require('discord.js');

exports.run = (client, message, args) => {
    
    let user;
    
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
    
    const avatar = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setAuthor("Avatar")
        .setImage(user.displayAvatarURL())
    message.channel.send(avatar)
    
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ['pp'],
  permLevel: `No perm.` 
};

exports.help = {
  name: 'avatar',
  description: 'Assigns the Avatar of the Specified Person or Writer.',
  usage: 'avatar [user]'
};