import { BaseNode } from "./_Base"
import { ModalRootNode } from "./ModalRoot"
import { Modal, Interaction } from "discord.js"
import {isModalRowNode, ModalRowNode} from './ModalRow'
import {isInputNode} from './Input'
import { EMPTY_STRING } from '../../constants'

export class ModalNode extends BaseNode<"modal", ModalRootNode, ModalRowNode> {
    disposer?: () => void

    constructor() {
        super("modal")
    }

    get customId() {
        return this.attr.id ? `${this.attr.id}-${this.uuid}` : this.uuid
    }

    render(): Modal {
        if (!this.rootNode) throw new Error('Root element not found for modal');
        const client = this.rootNode.client;
        const customId = this.customId

        const modal = new Modal()
            .setCustomId(customId)
            .setTitle(this.attr.title ?? EMPTY_STRING)
            .setComponents(
                ...this.children.filter(isModalRowNode).map((child) => child.render())
            )

        const listener = (interaction: Interaction) => {
            if (!interaction.isModalSubmit()) return
            if (interaction.customId !== customId) return

            if (!this.attr.onSubmit?.(interaction))
                interaction.reply({ content: "ok", ephemeral: true })

            this.children.filter(isModalRowNode).forEach((row) =>
                row.children.filter(isInputNode).forEach((input) => {
                    const customId = input.attr.id ? `${input.attr.id}-${input.uuid}` : input.uuid
                    input.attr.onChange?.(
                        interaction.fields.getTextInputValue(customId),
                        interaction
                    )
                })
            )
        }
        client.on("interactionCreate", listener)

        this.disposer = () => {
            client.removeListener("interactionCreate", listener)
        }

        return modal
    }
}

export const isModalNode = (node: BaseNode): node is ModalNode => node instanceof ModalNode
