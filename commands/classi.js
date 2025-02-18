const { SlashCommandBuilder } = require('discord.js')
const client = require('../index.js').client
const sqlite = require('better-sqlite3');
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder().setName('classi').setDescription('Mostra la lista delle classi'),

	async execute(interaction) {

		const db = sqlite(`${__dirname}/../storage/db.sqlite`)
		
		function getStudentCountBySection(sectionName) {
			const stmt = db.prepare(
				`SELECT COUNT(students.id) AS student_count
				 FROM sections
				 LEFT JOIN students ON sections.id = students.section
				 WHERE sections.name = ?`
			);
			const row = stmt.get(sectionName);
			return row ? row.student_count : 0;
		}
		

		const guild = await client.guilds.fetch(interaction.guild.id)
		const classes = guild.roles.cache.filter((r) => !isNaN(Number(r.name[0]))).sort()
		let list = ''

		
		classes.forEach((c) => {
			
			const maxSize = getStudentCountBySection(c.name);
			list += `${c.name} [${c.members.size} / ${maxSize}]\n`;
		})
		
		await interaction.reply({
			embeds: [
				{
					title: `📑 Lista classi`,
					description: list,
					color: 5763719
				}
			],
			ephemeral: true
		})
		db.close();
	}
}
