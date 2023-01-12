const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, InteractionCollector } = require('discord.js');

const config = require("../../config.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("ユーザー情報を照会")
        .addUserOption(
            option => option
            .setName("user")
            .setDescription("照会するユーザー")
        )
        ,

    async execute(i, client) {
        const inputUser = i.options.getUser("user");
        if(!inputUser){
            await i.reply({
                embeds: [
                    new EmbedBuilder()
                    .setAuthor(
                        {
                            name: i.user.tag,
                            iconURL: i.user.displayAvatarURL(
                                {
                                    dynamic: true
                                }
                            )
                        }
                    )
                ]
            })
        } else if (inputUser) {
            i.reply({
                embeds: [
                    new EmbedBuilder()
                    .setAuthor(
                        {
                            name: inputUser.tag,
                            iconURL: inputUser.displayAvatarURL({dynamic: true})
                        }
                    )
                    .setTitle(`${inputUser.username}さんの情報`)
                    .setColor("#2f3136")
                    .addFields(
                        {
                            name: "ユーザー名",
                            value: "`" + inputUser.tag + "`"
                        },
                        {
                            name: "ユーザーID",
                            value: "`" + inputUser.id + "`"
                        }
                    )
                    .setFooter(
                        {
                            text: `${i.user.tag}が取得しました`,
                            iconURL: i.user.displayAvatarURL({dynamic:true})
                        }
                    )
                ]
            })
        }
    },
}