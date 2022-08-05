import { EMPTY_STRING } from "../../helpers/constants"
import { TextContainerNode } from "../_TextContainer"
import type { EmbedBuilder } from "discord.js"
import type { EmbedNode } from "./Embed"

export class FooterNode extends TextContainerNode<"Footer", EmbedNode> {
	constructor() {
		super("Footer")
	}

	render(embed: EmbedBuilder): void {
		embed.setFooter({
			text: this.innerText ?? EMPTY_STRING,
			iconURL: this.attr.iconURL,
		})
	}
}
