const { DiscordTogether } = require('discord-together');
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("youtube")
        .setDescription("YouTubeTogetherを開始する"),

    async execute(interaction, client) {
        if(interaction.member.voice.channel) {
            client.discordTogether = new DiscordTogether(client);
            client.discordTogether.createTogetherCode(interaction.member.voice.channelId, 'youtube').then(async invite => {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle(":tv:YouTube Together")
                        .setDescription(`以下のボタンを押してYouTubeTogetherに参加しましょう！！`)
                        .setColor("#2f3136")
                        .setTimestamp()
                    ],
                    components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setURL(invite.code) //buttonにIDを割り当てる   *必須
                            .setStyle(ButtonStyle.Link)//buttonのstyleを設定する  *必須
                            .setLabel("📺参加する！")
                        )
                    ]
                })
            })
        }else{
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle(":warning:エラー")
                    .setDescription("ボイスチャンネルに参加していません!!")
                    .setColor("#ff0000")
                    .setTimestamp()
                ], allowedMentions : {repliedUser : false}
            })
        }
    }
}
