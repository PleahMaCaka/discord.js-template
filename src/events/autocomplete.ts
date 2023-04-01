import { Interaction } from "discord.js"
import { ClientEvent } from "../interfaces/ClientEvent"
import { client } from "../start"

const event: ClientEvent = {
    event: "interactionCreate",
    execute: (interaction: Interaction) => {
        if (!interaction.isAutocomplete()) return
        const command = client.slashCommands.get(interaction.commandName)

        try {
            if (!command?.autocomplete) return
            command.autocomplete(interaction)
        } catch (error) {
            console.error(error)
        }
    }
}

export default event