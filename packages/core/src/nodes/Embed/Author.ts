import { BaseNode } from "../_Base"
import { EMPTY_STRING } from "../../constants"
import { Embed } from "discord.js"
import { EmbedNode } from "./Embed"
import { TextContainerNode } from "../_TextContainer"

export class AuthorNode extends TextContainerNode<"author", EmbedNode> {
    constructor() {
        super("author")
    }

    render(embed: Embed): void {
        embed.setAuthor({
            name: this.innerText ?? EMPTY_STRING,
            iconURL: this.attr.iconURL,
            url: this.attr.url,
        })
    }
}

export const isAuthorNode = (node: BaseNode): node is AuthorNode =>
    node instanceof AuthorNode
