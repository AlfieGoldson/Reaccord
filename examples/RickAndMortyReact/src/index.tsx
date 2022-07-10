import { App } from "./App"
import { ChatInputCommand, Client } from "reaccord"
import { config as loadEnv } from "dotenv"

loadEnv()

const { DISCORD_TOKEN, DISCORD_DEV_GUILD_ID, DISCORD_CLIENT_ID } = process.env

const client = new Client({
    token: DISCORD_TOKEN ?? "",
    intents: ["GUILDS", "GUILD_MESSAGES"],
    devGuildId: DISCORD_DEV_GUILD_ID,
    clientId: DISCORD_CLIENT_ID,
})

const rickCmd = new ChatInputCommand("rick", "Rick and Morty characters info.")
    .stringParam("search", "Character name search")
    .render(({ search }) => <App search={search ?? ""} />)

client.registerCommand(rickCmd)

client.connect((client) =>
    console.log(`🚀 Client connected as ${client.user?.username}!`),
)
