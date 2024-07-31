export interface Message {
  messageId?: string,
  conversationId?: string,
  sentOn: Date,
  role: 'system' | 'user' | 'assistant',
  content: string,
}
