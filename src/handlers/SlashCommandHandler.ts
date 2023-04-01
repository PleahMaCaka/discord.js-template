import { Client } from "../custom/Client"
import { join } from "path"
import glob from "glob"
import Logger from "@pleahmacaka/logger"
import { SlashCommand } from "../interfaces/SlashCommand"
import { REST, Routes } from "discord.js"

export default async (client: Client) => {

    const slashCommandPath = join(__dirname, "../commands")

    Logger.info(`[/] Loading slash commands from [ ${slashCommandPath} ] ...`)

    for (const file of glob.sync(`${slashCommandPath}/**/*.{ts,js}`.replace(/\\/g, "/"))) {
        if (file.split(".").includes("prefix")) return
        if (!(file.endsWith(".ts") || file.endsWith(".js"))) return

        const cmd: SlashCommand = (await import("file:///" + file)).default
        Logger.info(`[/] ${cmd.command.name} loaded!`)

        client.slashCommands.set(cmd.command.name, cmd)
    }

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!) // TODO override login

    client.guilds.cache.forEach(guild => {
        guild.commands.set([]) // remove all
        rest.put(Routes.applicationGuildCommands(client.user!.id, guild.id), {
            body: client.slashCommands.map(command => command.command.toJSON())
        })
    })

    Logger.info(`[/] Successfully loaded ${client.slashCommands.size} command(s)`)

}