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

        Logger.info(`[E] ${file.split("/").pop()?.split(".").shift()} loaded!`)
        
        const { default: obj } = (await import("file://" + file)).default
        const event = obj as ClientEvent

        if (event.once) client.once(event.event, event.execute)
        else client.on(event.event, event.execute)
    }

}