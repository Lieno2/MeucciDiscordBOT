const { client } = require('../index.js')

let welcomeChannelID = '1044011880924074037'

client.on('guildMemberAdd', member => {
    client.channels.cache.get(welcomeChannelID).send("Benvenuto nel server <@" + member.id + ">!"); 
});