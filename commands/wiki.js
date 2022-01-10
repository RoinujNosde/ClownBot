const Discord = require('discord.js');
const fetch = require("node-fetch");

exports.run = async (_client, message, args) => {
  if (message.author.bot) return;
  let query = args.slice(0).join(' ');
  if (query.length < 1) {
    const embed = new Discord.MessageEmbed()
      .setColor('#56fc03')
      .setTitle('SimpleClans Wiki')
      .setDescription(`You will find useful guides here \n\n**Link:**\nhttps://simpleclans.gitbook.io/simpleclans/`)
    message.channel.send(embed);
  } else {
    var response = await fetch(`https://api-beta.gitbook.com/v1/spaces/-MDzSURjf29qvGnoWu7Z/search?query=${query}`, {
      headers: { Authorization: 'Bearer eTlNSENQc0s5bGgzejFMaWIxclJzYXQwMmQ0MjotTWZUaFpKWm02Qk0wUUx3eFNRTC0tTWZUaFpKX1NtVFktNUhiMEFWNw==' }
    }).then(res => res.json());
    let title;
    try {
      title = response.results[0].title;
    } catch (e) {
      title = null;
    }
    if (title != null) {
      let url = 'https://simpleclans.gitbook.io/simpleclans/' + response.results[0].url;
      const embed = new Discord.MessageEmbed()
        .setTitle(title)
        .setColor('#56fc03')
        .setDescription("Page link:\n" + url)
        .setFooter(message.author.tag, message.author.displayAvatarURL())
      message.channel.send(embed);
    } else {
      const embed = new Discord.MessageEmbed()
        .setTitle("SimpleClans Wiki")
        .setColor('RED')
        .setDescription("Page not found!")
        .setFooter(message.author.tag, message.author.displayAvatarURL())
      message.channel.send(embed);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'wiki',
  description: 'Wiki command',
  usage: 'wiki <obj>'
};
