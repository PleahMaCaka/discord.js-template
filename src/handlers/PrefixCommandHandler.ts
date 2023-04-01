import { Client } from "../custom/Client"
import { join } from "path"
import Logger from "@pleahmacaka/logger"
import type { PrefixCommand } from "../interfaces/PrefixCommand"

export default async (client: Client) => {

    const prefixCommandPath = join(__dirname, "../commands")

    Logger.info(`[${client.defaultPrefix}] Loading prefix commands from [ ${prefixCommandPath} ] ...`)

    for (const file of `${prefixCommandPath}/**/*.prefix.{ts,js}`.replace(/\\/g, "/")) {
        if (!(file.endsWith(".ts") || file.endsWith(".js"))) return

        const cmd: PrefixCommand = (await import("file:///" + file)).default

        Logger.info(`[${client.defaultPrefix}] ${cmd.name} loaded!`)

        client.prefixCommands.set(cmd.name, cmd)
    }

}