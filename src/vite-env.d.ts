/// <reference types="vite/client" />

declare module 'virtual:project-shots' {
  const screenshotsByRepo: Record<string, string[]>
  export { screenshotsByRepo }
}
