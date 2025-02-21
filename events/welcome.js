const { client } = require('../index.js')
const fs = require('fs')
const yaml = require('js-yaml');

let config;
try {
  const fileContents = fs.readFileSync('../meuccidiscordbot/config.yml', 'utf8');
  config = yaml.load(fileContents);
} catch (e) {
  console.error(e);
  process.exit(1);
}
const welcomeChannelID = config.welcome.channelID


client.on('guildMemberAdd', member => {
    client.channels.cache.get(welcomeChannelID).send(config.welcome.message.replace("${user-tag}","<@" + member.id + ">!"));
});