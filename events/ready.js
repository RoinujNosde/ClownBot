const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const settings = require('../settings.json');

var prefix = settings.prefix;

module.exports = async (client) => {

  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Active, Commands loaded!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Login with the name ${client.user.username}`);

  // let channel = client.channels.cache.get(settings.rrchannelid);
  //   let msgId = settings.rrmessageid;
  //   await channel.messages.fetch(msgId);
};