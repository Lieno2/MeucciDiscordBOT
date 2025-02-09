const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const sqlite = require('better-sqlite3');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('aggiorna-classi')
        .setDescription('Aggiorna le classi di tutti gli utenti del server.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: "Non hai il permesso per eseguire questo comando.", ephemeral: true });
        }

        const guild = interaction.guild;
        const db = sqlite(`${__dirname}/../storage/db.sqlite`)

        try {
            const verifyRole = guild.roles.cache.find(role => role.name === '✅');
            const graduated = guild.roles.cache.find(role => role.name === 'Diplomato');
            const members = await guild.members.fetch();

            members.forEach(async (member) => {
                
                
                if(!member.roles.cache.has(verifyRole.id)) return;
                
                if (member.user.bot) return;
                
                const username = member.nickname.split('(')[0].trim().toLowerCase();

                
                const student = db.prepare(
                    'SELECT students.name, sections.name as section FROM students JOIN sections ON students.section = sections.id WHERE students.name = ?'
                ).get(username);
                
                const classRoles = guild.roles.cache.filter(role => role.name.match(/^\d+/));
                
                let newNickname

                if (student){
                    const classRole = guild.roles.cache.find(role => role.name === student.section);
                    if (!classRole) return;

                    await member.roles.remove(classRoles);
                    await member.roles.add(classRole);
                    newNickname = `${student.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} (${student.section})`;
                    
                } else {
                    
                    newNickname = username
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                    
                    await member.roles.remove(classRoles);
                    await member.roles.add(graduated);
                }
                
                
                if (member.nickname !== newNickname) {
                    await member.setNickname(newNickname).catch(console.error);
                }
                
            });

            interaction.editReply({ content: 'Le classi degli utenti sono state aggiornate!', ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.editReply({ content: 'Si è verificato un errore durante l’aggiornamento delle classi.', ephemeral: true });
        } finally {
            db.close();
        }
    }
};
