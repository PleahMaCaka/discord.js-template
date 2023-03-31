import { PrefixCommand } from "../interfaces/PrefixCommand"

export const command: PrefixCommand = {
    name: "ping",
    execute: async (message) => {
        message.channel.send("pong")
    }
}

export default command