const settings = require('../settings.json');
const { MessageEmbed } = require('discord.js');

let talkedRecently = new Set();

module.exports = message => {
  delete require.cache[require.resolve('../settings.json')]
  const settings = require('../settings.json');

  processCommands(message);
  processSuggestion(message);

};

function processCommands(message) {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(settings.prefix)) return;
  let command = message.content.split(' ')[0].slice(settings.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    // TODO Check if guild only
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
}

function processSuggestion(message) {
  if (message.channel.id !== settings.suggestions_channel_id) {
    return;
  }
  if (!message.guild) {
    return;
  }
  if (message.author.bot) {
    return;
  }

  message.delete();

  let splitContent = message.content.split(" ");
  if (splitContent.length <= 5) {
    message.channel.send("Your message is too short!").then(msg => msg.delete({ timeout: 2500 }));
    return;
  }

  let plugin = isValidPlugin(splitContent[0]);
  let suggestion = splitContent.slice(1).join(" ");

  if (!plugin) {
    message.channel.send(`${splitContent[0]} is not a valid plugin. Valid plugins: ${settings.plugins}`)
      .then(message => message.delete({ timeout: 15000 }));
    return;
  }

  let embed = new MessageEmbed()
    .setTitle(plugin)
    .setDescription(suggestion)
    .setTimestamp()
    .setFooter(message.author.tag, message.author.avatarURL());

  message.channel.send(embed).then(msg => {
    msg.react("888571345233903646");
    msg.react("888571345196175390");
  });

}

function isValidPlugin(plugin) {
  let valid = false;
  settings.plugins.forEach(function (value) {
    if (value.toLowerCase() == plugin.toLowerCase().trim()) {
      valid = value;
    }
  });
  return valid;
}