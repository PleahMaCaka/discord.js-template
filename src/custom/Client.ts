import { Client as DiscordJSClient, ClientOptions, Collection } from "discord.js"
import { join } from "path"
import { PrefixCommand } from "../interfaces/PrefixCommand"
import { SlashCommand } from "../interfaces/SlashCommand"
import Logger from "@pleahmacaka/logger"
import glob from "glob"

export class Client extends DiscordJSClient {
    public prefixCommands = new Collection<string, PrefixCommand>()
    public slashCommands = new Collection<string, SlashCommand>()
    public defaultPrefix = "!"

    constructor(options: ClientOptions) {
        super(options)

        this.once("ready", async () => {
            await this.loadHandlers()
        })
    }

    public async loadHandlers() {
        const handlerPath = join(__dirname, "../handlers")

        for (const file of glob.sync(`${handlerPath}/**/*.js`.replace(/\\/g, "/"))) {
            Logger.info(`[H] ${file} loaded!`)
            const { default: handlerFunction } = await import(`file:///${handlerPath}/${file}`)
            handlerFunction(this)
        }
    }
}
