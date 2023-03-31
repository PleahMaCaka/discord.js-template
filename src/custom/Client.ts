import { Client as ClientJS, ClientOptions, Collection, CommandInteraction, Integration, Interaction, Message } from "discord.js"
import { readdirSync } from "fs"
import { join } from "path"
import { PrefixCommand } from "../interfaces/PrefixCommand"
import { SlashCommand } from "../interfaces/SlashCommand"
import Logger from "@pleahmacaka/logger"

export class Client extends ClientJS {

    public prefixCommands = new Collection<string, PrefixCommand>()

    public slashCommands = new Collection<string, SlashCommand>()

    public defaultPrefix = "!"

    constructor(options: ClientOptions) {
        super(options)

        this.once("ready", () => {
            this.loadHandlers()
        })
    }

    public loadHandlers() {
        const handlerPath = join(__dirname, "../handlers")

        readdirSync(handlerPath).forEach(handler => {
            Logger.info(`[H] ${handler} loaded!`)
            require(`${handlerPath}/${handler}`)(this)
        })
    }

}