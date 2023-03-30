import { PrefixCommand } from "../interfaces/PrefixCommand"

const command: PrefixCommand = {
    name: "ping",
    execute: async (message) => {
        message.channel.send("pong")
    }
}

export default command