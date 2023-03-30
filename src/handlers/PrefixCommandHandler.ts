import { Client } from "../custom/Client"
import { PrefixCommand } from "../interfaces/PrefixCommand"
import { readdirSync } from "fs"
import { join } from "path"

module.exports = (client: Client) => {

    const prefixCommands: Array<PrefixCommand> = []

    const prefixCommandPath = join(__dirname, "../commands")

    readdirSync(prefixCommandPath).forEach(file => {
        if (!(file.endsWith(".ts") || file.endsWith(".js"))) return

        const cmd: PrefixCommand = require(`${prefixCommandPath}/${file}`).default
        console.log(`[${client.defaultPrefix}] ${cmd.name} loaded!`)

        prefixCommands.push(cmd)
        client.prefixCommands.set(cmd.name, cmd)
    })

}