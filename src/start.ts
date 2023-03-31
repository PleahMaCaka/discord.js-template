import { Client } from "./custom/Client"
import "dotenv/config"
import { ALL_INTENTS } from "./utils/ALL_INTENTS"

export const client = new Client({
    intents: ALL_INTENTS
})

client.login(process.env.TOKEN)