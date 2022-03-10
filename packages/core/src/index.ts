import {
    ButtonInteraction,
    Client,
    DMChannel,
    Message,
    MessageEditOptions,
    NewsChannel,
    PartialDMChannel,
    TextChannel,
    ThreadChannel,
} from "discord.js"
import { EMPTY_STRING } from "./constants"
import { JSX } from "../jsx-runtime"
import { ModalRootNode } from "./nodes/Interaction/ModalRoot"
import { RootNode } from "./nodes/Root"

export type RenderFn = (
    code: () => JSX.Element,
    root: RootNode | ModalRootNode,
    client: Client,
    message: Message
) => void

type Channel =
    | DMChannel
    | PartialDMChannel
    | NewsChannel
    | TextChannel
    | ThreadChannel

const debounce = <T extends unknown[]>(fn: (...args: T) => void, ms = 300) => {
    let timeoutId: NodeJS.Timeout
    return (...args: T) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn(...args), ms)
    }
}

const createModal = (
    render: RenderFn,
    client: Client,
    code: JSX.Element,
    message: Message
) => {
    const modal = new ModalRootNode(client)
    render(() => code, modal, client, message)

    return modal.render()
}

// If used directly inside button (<button onClick={openModal(Modal)}/>),
// will prevent the app from defering update, because opening a modal is
// already an interaction response.
export const openModal =
    (render: RenderFn, client: Client, message: Message) =>
    (modal: JSX.Element) =>
    (interaction: ButtonInteraction): true => {
        interaction.showModal(createModal(render, client, modal, message))
        return true
    }

export const renderMessage =
    (render: RenderFn, client: Client) =>
    async (channel: Channel, message: () => JSX.Element) => {
        const msg = await channel.send(EMPTY_STRING)

        const cb = async (root: RootNode) => {
            const rendered = root.render()
            if (msg) return await msg.edit(rendered as MessageEditOptions)
            throw new Error("Failed to send message")
        }

        const root = new RootNode(client, debounce(cb, 50))
        render(message, root, client, msg)
        return msg
    }

export const reaccord = (render: RenderFn) => (client: Client) => ({
    renderMessage: renderMessage(render, client),
})

export * from "./constants"
export * from "./nodes"
export * from "./helpers"
