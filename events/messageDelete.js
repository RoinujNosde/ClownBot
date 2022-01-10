const { MessageEmbed } = require('discord.js');

module.exports = message => {
    delete require.cache[require.resolve('../settings.json')]
    const settings = require('../settings.json');

    if (message.author.bot) {
        return;
    }

    let channel = message.guild.channels.cache.get(settings.deleted_channel_id);
    if (!channel) {
        return;
    }

    let embed = new MessageEmbed()
        .setTitle("#" + message.channel.name)
        .setDescription(message.content)
        .setTimestamp()
        .setFooter(message.author.tag, message.author.avatarURL());

    channel.send(embed);

};