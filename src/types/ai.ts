export interface Message {
  messageId?: string,
  conversationId?: string,
  sentOn: Date,
  role: 'system' | 'user' | 'assistant',
  content: string,
}

export enum Providers {
  OpenAi = "OpenAi",
  Anthropic = "Anthropic"
}

export interface Capabilities {
  multimodal?: boolean,
  function_calling?: boolean
}

export interface AIModel {
  label: string,
  value: string,
  provider: Providers,
  capabilities: Capabilities
}