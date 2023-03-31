import { Client } from "../custom/Client"
import { join } from "path"
import glob from "glob"
import Logger from "@pleahmacaka/logger"
import { SlashCommand } from "../interfaces/SlashCommand"
import { REST, Routes } from "discord.js"

module.exports = async (client: Client) => {

    const slashCommandPath = join(__dirname, "../commands")

    Logger.info(`[/] Loading slash commands from [ ${slashCommandPath} ] ...`)

    glob.sync(`${slashCommandPath}/**/*.{ts,js}`).forEach(file => {
        if (file.split(".").includes("prefix"))
            return
        if (!(file.endsWith(".ts") || file.endsWith(".js")))
            return

        const cmd: SlashCommand = require(`${file}`).default
        Logger.info(`[/] ${cmd.command.name} loaded!`)

        client.slashCommands.set(cmd.command.name, cmd)
    })

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!) // TOOD override login

    client.guilds.cache.forEach(async guild => {
        guild.commands.set([]) // remove all
        // await rest.put(Routes.applicationGuildCommands(client.user!.id, guild.id), {
            // body: client.slashCommands.map(command => command.command.toJSON())
        // })
        Logger.info(`[/] Successfully loaded ${client.slashCommands.size} command(s)`)
    })
}