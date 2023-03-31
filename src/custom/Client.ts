import { Client as ClientJS, ClientOptions, Collection, Message } from "discord.js"
import { readdirSync } from "fs"
import { join } from "path"
import { PrefixCommand } from "../interfaces/PrefixCommand"
import Logger from "@pleahmacaka/logger"

export class Client extends ClientJS {

    public prefixCommands = new Collection<string, PrefixCommand>()

    public defaultPrefix = "!"

    constructor(options: ClientOptions) {
        super(options)

        this.once("ready", () => {
            this.loadHandlers()
            this.autoExecutor()
        })
    }

    public loadHandlers() {
        const handlerPath = join(__dirname, "../handlers")

        readdirSync(handlerPath).forEach(handler => {
            Logger.info(`[H] ${handler} loaded!`)
            require(`${handlerPath}/${handler}`)(this)
        })
    }

    public autoExecutor() {
        this.on("messageCreate", (message: Message) => {
            const args = message.content.substring(this.defaultPrefix.length).split(" ")
            const command = this.prefixCommands.get(args[0])
            if (command) command.execute(message, args)
        })
    }

}