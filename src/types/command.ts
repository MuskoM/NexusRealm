export enum Category {
  SETTINGS = 'Settings',
  APP = 'App',
  CHAT = 'Chat',
  CLIPBOARD = 'Clipboard',
  WEBHOOKS = 'Webhooks',
  OTHER = '',
}

export interface Command {
  title: string,
  aliases?: string[]
  shortcut?: string,
  handler: Function
  category: Category
}
