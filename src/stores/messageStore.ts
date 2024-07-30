import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import {type Message} from '../types/messaging.ts'

export const useMessageStore = defineStore('message', () => {
  const messages = ref<Message>([
    {sentOn: new Date(), type: 'system', text: 'You are knowledgable in geography, respond only for geography related questions'},
    {sentOn: new Date(), type: 'user', text: 'Tell me more about Warsaw'},
    {sentOn: new Date(), type: 'assistant', text: 'Warsaw is a beautiful city full of people and old buildings ....'}
  ])

  const userMessages = computed(()=> messages.value.filter(msg=>msg.type === 'user'))

  const addMessage = (msgType: 'user' | 'system' | 'assistant', text: string) => {
    messages.value.push({sentOn: new Date(), type: msgType, text: text})
  }

  const sendMessages = () => {
    // Prepare messages to send
    console.log("Messages sent to LLM")

    // Call an API
    
    // Read returned response
    
    // Add response to messages

  }

  return {messages, userMessages, addMessage}
});
