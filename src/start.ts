import { Client } from "discord.js"
import "dotenv/config"
import { ALL_INTENTS } from "./utils/ALL_INTENTS"

const client = new Client({
    intents: ALL_INTENTS
})

client.once("ready", () => {
    console.log("Ready!")
})

client.login(process.env.TOKEN)