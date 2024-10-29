export interface Incantation {
  title: string,
  aliases?: string[]
  shortcut?: string,
  handler: Function,
  args?: { name: string }[]
  isGlobal: boolean
}
