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
        this.on("interactionCreate", (interaction: Interaction) => {
            if (!interaction.isChatInputCommand()) return
            const command = this.slashCommands.get(interaction.commandName)

            if (!command) return

            command.execute(interaction as CommandInteraction)
        })
        this.on("interactionCreate", (interaction: Interaction) => {
            if (!interaction.isAutocomplete()) return
            const command = this.slashCommands.get(interaction.commandName)
            try {
                if (!command?.autocomplete) return
                command.autocomplete(interaction)
            } catch (error) {
                console.error(error)
            }
        })
        // this.on("interactionCreate", (interaction: Interaction) => {
        //     if (!interaction.isAutocomplete()) return
        //     const command = this.slashCommands.get(interaction.commandName
            
        // })
    }

}