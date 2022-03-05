import { ButtonInteraction, ColorResolvable, ButtonStyle, ModalSubmitInteraction } from "discord.js"
import { BaseNode } from "./src/renderer/nodes/_Base"

export namespace JSX {
    type Element =
        | BaseNode
        | ArrayElement
        | FunctionElement
        | (string & {})
        | number
        | boolean
        | null
        | undefined
    interface ArrayElement extends Array<Element> {}
    interface FunctionElement {
        (): Element
    }
    interface ElementClass {
        render(props: any): Element
    }
    // Text
    interface LineBreakAttributes {}
    interface CodeAttributes {
        children?: Element
    }
    interface CodeBlockAttributes {
        lang: string
        children?: Element
        multiline?: boolean
    }
    interface SpanAttributes {
        italic?: boolean
        bold?: boolean
        children?: Element
    }
    // Content
    interface ContentAttributes {
        children?: Element
    }
    // Embed
    interface AnchorAttributes {
        href: string
        children?: Element
    }
    interface EmbedAttributes {
        children?: Element
    }
    interface AuthorAttributes {
        name: Element
        url?: string
        iconURL?: string
    }
    interface ColorAttributes {
        color: ColorResolvable
    }
    interface DescriptionAttributes {
        children?: Element
    }
    interface FooterAttributes {
        children?: Element
    }
    interface ImageAttributes {
        src: string
    }
    interface ThumbnailAttributes {
        src: string
    }
    interface TimestampAttributes {
        timestamp?: Date | number | null
    }
    interface TitleAttributes {
        children?: Element
    }
    interface UrlAttributes {
        href: string
    }
    interface FieldAttributes {
        title: Element
        children?: Element
        inline?: boolean
    }
    // Components
    interface ActionRowAttributes {
        children?: Element
    }
    interface ModalRowAttributes {
        children?: Element
    }
    interface ButtonAttributes {
        id?: string
        /**
         * By default, onClick will trigger a defered update, to prevent this, return a truthy value
         */
        onClick?: (interaction: ButtonInteraction) => any
        children?: Element
        disabled?: boolean
        style?: keyof typeof ButtonStyle
    }
    interface TextInputAttributes {
        id?: string
        onChange?: (value: string, interaction: ModalSubmitInteraction) => void
        label?: string
        value?: string
        placeholder?: string
        required?: boolean
        large?: boolean
    }
    interface ModalAttributes {
        id?: string
        children?: Element[]
        title: string
        onSubmit?: (interaction: ModalSubmitInteraction) => void
    }
    interface IntrinsicElements {
        // Text
        a: AnchorAttributes
        br: LineBreakAttributes
        code: CodeAttributes
        codeblock: CodeBlockAttributes
        span: SpanAttributes
        // Content
        content: ContentAttributes
        // Embed
        embed: EmbedAttributes
        author: AuthorAttributes
        color: ColorAttributes
        desc: DescriptionAttributes
        img: ImageAttributes
        thumbnail: ThumbnailAttributes
        timestamp: TimestampAttributes
        title: TitleAttributes
        url: UrlAttributes
        field: FieldAttributes
        // Action Row
        "action-row": ActionRowAttributes
        button: ButtonAttributes
        // Modal
        modal: ModalAttributes
        "modal-row": ModalRowAttributes
        input: TextInputAttributes
    }
}
