import { Client } from "../custom/Client"
import { join } from "path"
import glob from "glob"
import Logger from "@pleahmacaka/logger"
import type { ClientEvent } from "../interfaces/ClientEvent"

export default async (client: Client) => {

    const eventPath = join(__dirname, "../events")

    Logger.info(`[E] Loading events from [ ${eventPath} ] ...`)

    for (const file of glob.sync(`${eventPath}/**/*.{ts,js}`.replace(/\\/g, "/"))) {
        if (!(file.endsWith(".ts") || file.endsWith(".js"))) continue

        const event: ClientEvent = (await import("file:///" + file)).default

        Logger.info(`[E] ${file.split("/").pop()?.split(".").shift()} loaded!`)

        if (event.once) client.once(event.event, (...args) => event.execute(...args))
        else client.on(event.event, (...args) => event.execute(...args))
    }

}