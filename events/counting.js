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

let countingChannelID = config.counting.channelID

let count
client.on('ready', () => {
	const channel = client.channels.cache.get(countingChannelID)

	channel.messages.fetch({ limit: 1 }).then((messages) => {
		const lastMessage = messages.last()

		count = Number(lastMessage.content) + 1
	})
})

client.on('messageCreate',async (message) => {
	const { channel, content, member } = message

	if (channel.id === countingChannelID) {
		if (member.user.bot) return

		if (Number(content) !== count)
			await message.delete()
		else {
			count++
			if(config.counting.enableReaction === true)
				message.react('✅')
		}
	}
})
