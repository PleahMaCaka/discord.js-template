import { Client } from "../custom/Client"
import { join } from "path"
import glob from "glob"
import Logger from "@pleahmacaka/logger"
import { SlashCommand } from "../interfaces/SlashCommand"
import { REST, Routes } from "discord.js"

export default async (client: Client) => {

    const slashCommandPath = join(__dirname, "../commands")

    Logger.info(`[/] Loading slash commands from [ ${slashCommandPath} ] ...`)

    for await (const file of glob.sync(`${slashCommandPath}/**/*.{ts,js}`.replace(/\\/g, "/"))) {
        if (file.split(".").includes("prefix")) continue
        if (!(file.endsWith(".ts") || file.endsWith(".js"))) continue

        const { default: obj } = (await import("file://" + file)).default
        const cmd = obj as SlashCommand

        client.slashCommands.set(cmd.command.name, cmd)
    }

    await deployAllGuild(client)
        .then(() => {
            const commandNames: Array<string> = []
            client.slashCommands.forEach(cmd => commandNames.push(cmd.command.name))

            Logger.info(`[/] Commands: [ ${commandNames.join(", ")} ]`)
            Logger.info(`[/] Successfully loaded ${client.slashCommands.size} command(s)`)
        })

}

const deployAllGuild = async (client: Client) => {
    Logger.info("[/] Deploying commands ...")

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!) // TODO override login

    client.guilds.cache.forEach(guild => {
        // guild.commands.set([]) // remove all
        rest.put(Routes.applicationGuildCommands(client.user!.id, guild.id), {
            body: client.slashCommands.map(command => command.command.toJSON())
        })
    })
}