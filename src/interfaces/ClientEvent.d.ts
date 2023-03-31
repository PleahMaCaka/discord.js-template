import { ClientEvents } from "discord.js"

export interface ClientEvent {
    event: Object.keys<ClientEvents>[number]
    once?: boolean = false
    execute: (...args?) => void
}