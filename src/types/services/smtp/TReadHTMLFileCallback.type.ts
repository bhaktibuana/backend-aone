export type TReadHTMLFileCallback = (
  error: NodeJS.ErrnoException | null,
  html?: string
) => void;
