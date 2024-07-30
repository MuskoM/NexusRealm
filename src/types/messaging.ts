export interface Message {
  id: string,
  type: 'system' | 'user' | 'assistant',
  text: string,
}
