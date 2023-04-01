import { ChannelType, CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js"
import { SlashCommand } from "../interfaces/SlashCommand"

const slash: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clears the chat")
        .addIntegerOption(option => {
            return option
                .setMinValue(1)
                .setMaxValue(100)
                .setName("amount")
                .setDescription("The amount of messages to delete")
                .setRequired(true)
        })
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    execute: async (interaction: CommandInteraction) => {
        const { options, channel } = interaction

        const amount = options.get("amount")?.value as number

        if (channel?.type == ChannelType.DM)
            return interaction.reply({ content: "You can't use this command in DMs", ephemeral: true })

        await channel?.messages.fetch({ limit: amount }).then(async msgs => {
            (await channel.bulkDelete(msgs, true)).size == 0 ?
                await interaction.reply({ content: "There are no messages to delete", ephemeral: true }) :
                await interaction.reply({ content: `Deleted ${msgs.size} messages`, ephemeral: true })
            setTimeout(() => interaction.deleteReply(), 5000)
        })

    }
}

export default slash