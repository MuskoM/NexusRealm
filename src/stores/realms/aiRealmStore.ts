import { invoke } from "@tauri-apps/api/tauri";
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { type Message } from '../../types/ai.ts'
import { AIModel, Providers } from "../../types/ai";
import { availableModels as models } from "../../constants/models";

export const useAiRealmStore = defineStore('realm_ai', () => {
  // Messaging
  const messages = ref<Message[]>([
  ])
  const isWaitingForResponse = ref<boolean>(false);
  const userMessages = computed(() => messages.value.filter(msg => msg.role === 'user'))

  const addMessage = async (msgType: 'user' | 'system' | 'assistant', text: string) => {
    messages.value.push({ sentOn: new Date(), role: msgType, content: text })
  }

  const sendMessages = async (): Promise<void> => {
    // Prepare messages to send
    let response = ""
    // Call an API
    try {
      response = await invoke("send_messages_to_model", { messages: messages.value, model: models.find(m => m.value === 'gpt-4o-mini') });
    } catch (e) {
      response = "No response from model"
      console.error(e)
    }
    // Add response to messages
    await addMessage('assistant', response)
  }

  const removeMessage = async (id: number): Promise<Message[]> => {
    return messages.value.splice(id, 1)
  }

  const changeWaitingStatus = () => {
    if (isWaitingForResponse.value) {
      isWaitingForResponse.value = false
    } else {
      isWaitingForResponse.value = true
    }
  }

  return { messages, userMessages, addMessage, sendMessages, removeMessage, isWaitingForResponse, changeWaitingStatus }
});
