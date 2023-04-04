import { Message } from "discord.js"
import { ClientEvent } from "../interfaces/ClientEvent"
import { client } from "../start"

const event: ClientEvent = {
    event: "messageCreate",
    execute: (message: Message) => {
        console.log(message.content)
        if (!message.content.startsWith(client.defaultPrefix)) return

        const args = message.content.substring(client.defaultPrefix.length).split(" ")
        const command = client.prefixCommands.get(args[0])

        if (command) command.execute(message, args)
    }
}

export default event