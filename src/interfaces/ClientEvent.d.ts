import { ClientEvents } from "discord.js"

export interface ClientEvent {
    event: Object.keys<ClientEvents>[number]
    once?: boolean
    execute: (...args?) => void
}