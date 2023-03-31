import { AutocompleteInteraction, CommandInteraction, SlashCommandBuilder } from "discord.js";

export interface SlashCommand {
    command: SlashCommandBuilder
    execute: (interaction: CommandInteraction) => void
    autocomplete?: (interaction: AutocompleteInteraction) => void
    cooldown?: number
}