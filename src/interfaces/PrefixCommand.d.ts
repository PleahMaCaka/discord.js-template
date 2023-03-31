import { Message, PermissionResolvable } from "discord.js"

export interface PrefixCommand {
    name: string,
    description?: string
    execute: (message: Message, args: Array<string>) => void,
    permissions?: Array<PermissionResolvable>,
    aliases?: Array<string>,
    cooldown?: number
}