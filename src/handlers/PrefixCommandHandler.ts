import { Client } from "../custom/Client"
import { PrefixCommand } from "../interfaces/PrefixCommand"
import { join } from "path"
import glob from "glob"
import Logger from "@pleahmacaka/logger"

module.exports = (client: Client) => {

    const prefixCommandPath = join(__dirname, "../commands")

    Logger.info(`[${client.defaultPrefix}] Loading prefix commands from [ ${prefixCommandPath} ] ...`)

    glob.sync(`${prefixCommandPath}/**/*.prefix.{ts,js}`).forEach(file => {
        if (!(file.endsWith(".ts") || file.endsWith(".js"))) return

        const cmd: PrefixCommand = require(file).default
        Logger.info(`[${client.defaultPrefix}] ${cmd.name} loaded!`)

        client.prefixCommands.set(cmd.name, cmd)
    })

}