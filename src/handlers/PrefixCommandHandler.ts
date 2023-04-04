import { Client } from "../custom/Client"
import { join } from "path"
import Logger from "@pleahmacaka/logger"
import type { PrefixCommand } from "../interfaces/PrefixCommand"
import glob from "glob"

export default async (client: Client) => {

    const prefixCommandPath = join(__dirname, "../commands")

    Logger.info(`[${client.defaultPrefix}] Loading prefix commands from [ ${prefixCommandPath} ] ...`)

    for (const file of glob.sync(`${prefixCommandPath}/**/*.prefix.{ts,js}`.replace(/\\/g, "/"))) {
        if (!(file.endsWith(".ts") || file.endsWith(".js"))) continue

        const { default: obj } = (await import("file://" + file)).default
        const cmd = obj as PrefixCommand

        Logger.info(`[${client.defaultPrefix}] ${cmd.name} loaded!`)

        client.prefixCommands.set(cmd.name, cmd)
    }

}