import { Interaction } from "discord.js";
import { ClientEvent } from "../interfaces/ClientEvent";
import { client } from "../start";

const event: ClientEvent = {
    event: "interactionCreate",
    execute: (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return
        const command = client.slashCommands.get(interaction.commandName)
        
        if (!command) return
        command.execute(interaction)
    }
}

export default event