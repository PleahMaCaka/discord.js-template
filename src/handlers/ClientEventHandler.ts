import { Client } from "../custom/Client"
import { join } from "path"
import glob from "glob"
import Logger from "@pleahmacaka/logger"
import { ClientEvent } from "../interfaces/ClientEvent"

module.exports = (client: Client) => {

    const eventPath = join(__dirname, "../events")

    Logger.info(`[E] Loading events from [ ${eventPath} ] ...`)

    glob.sync(`${eventPath}/**/*.{ts,js}`.replace(/\\/g, "/")).forEach(file => {
        if (!(file.endsWith(".ts") || file.endsWith(".js"))) return

        const event: ClientEvent = require(file).default

        Logger.info(`[E] ${file.split("/").pop()?.split(".").shift()} loaded!`)

        if (event.once) client.once(event.event, (...args) => event.execute(...args))
        else client.on(event.event, (...args) => event.execute(...args))
    })

}