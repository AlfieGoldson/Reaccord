import { Image, Thumb, useMessageCtx } from "reaccord"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useRenderImageFile } from "./useRenderAttachment"
import type { QueryKey } from "@tanstack/react-query"
import type { ReactElement, ReactNode } from "react"
import type { RenderContext } from "./render"
import type { RenderImageFileQueryOptions } from "./useRenderAttachment"

const DEFAULT_WIDTH = 1920
const DEFAULT_HEIGHT = 1080

// TODO: add placeholder image src
export type CanvasImageProps<Key extends QueryKey | string> = {
  id: Key
  children: ReactNode | ((context: RenderContext) => ReactElement)
  width?: number
  height?: number
  options?: RenderImageFileQueryOptions<
    // @ts-expect-error - wontfix for now
    Key extends string ? [string, Key] : [string, ...Key]
  >
  as?: "Image" | "Thumb"
}

// TODO: add a way to block rendering if the image is not ready
// ex: const {setBlockRender} = useMessageCtx()
// + find a way for the first render not to be an edit
const CanvasImageContent = <Key extends QueryKey | string>({
  id,
  children,
  width,
  height,
  options,
  as = "Image",
}: CanvasImageProps<Key>) => {
  const { message } = useMessageCtx()

  const { imageFile } = useRenderImageFile(
    typeof id === "string" ? [message.id, id] : [message, ...id],
    typeof children === "function" ? children : () => <>{children}</>,
    // @ts-expect-error - wontfix for now
    {
      ...options,
      ...{
        viewport: {
          width: width ?? DEFAULT_WIDTH,
          height: height ?? DEFAULT_HEIGHT,
          ...options?.viewport,
        },
      },
    },
  )

  if (!imageFile) return null

  switch (as) {
    case "Thumb":
      return <Thumb file={imageFile} />
    default:
      return <Image file={imageFile} />
  }
}

// TODO: add a way to pass in a custom client
const queryClient = new QueryClient()

export const CanvasImage = <Key extends QueryKey | string>(
  props: CanvasImageProps<Key>,
) => (
  <QueryClientProvider client={queryClient}>
    <CanvasImageContent {...props} />
  </QueryClientProvider>
)
