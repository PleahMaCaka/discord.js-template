import { Client } from "../custom/Client"
import { PrefixCommand } from "../interfaces/PrefixCommand"
import { join } from "path"
import glob from "glob"

module.exports = (client: Client) => {

    const prefixCommands: PrefixCommand[] = []

    const prefixCommandPath = join(__dirname, "../commands")

    glob.sync("src/commands/**/*.{ts,js}").forEach(file => {
        if (!(file.endsWith(".ts") || file.endsWith(".js"))) return

        const cmd: PrefixCommand = require(`${prefixCommandPath}/${file}`).default
        console.log(`[${client.defaultPrefix}] ${cmd.name} loaded!`)

        prefixCommands.push(cmd)
        client.prefixCommands.set(cmd.name, cmd)
    })

}