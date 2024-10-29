<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAiRealmStore } from '../stores/realms/aiRealmStore'
import Button from './elements/Button.vue';
import Spinner from './elements/Spinner.vue';
import { Providers } from '../types/ai.ts';
import { notify } from '../lib/appNotifications.ts';

const messaging = useAiRealmStore()
const userMsgField = ref("")
const textarea = ref(null)
const selectedRole = ref<"system" | "user" | "assistant">("user");
const selectedProvider = computed(() => {
  return Providers.OpenAi
})

const handleSubmit = async () => {
  messaging.changeWaitingStatus()
  if (userMsgField.value) {
    await messaging.addMessage("user", userMsgField.value)
    userMsgField.value = ""
  }
  await messaging.sendMessages()
  messaging.changeWaitingStatus()

}

const checkKey = (event) => {
  if (event.ctrlKey && event.key === 'Enter')
    handleSubmit()
}

const add_message = async () => {
  if (selectedProvider.value === Providers.Anthropic && messaging.messages.find(m => m.role === 'system')) {
    await notify({ level: "error", content: "Multiple System fields not allowed", visibleFor: 5000 })
    return
  }
  await messaging.addMessage(selectedRole.value, userMsgField.value)
  userMsgField.value = ""
}
const resizeTextArea = () => {
  textarea.value.style.height = 'auto'
  textarea.value.style.height = `${textarea.value.scrollHeight}px`
}

</script>
<template>
  <form class="user-input" @submit.prevent="handleSubmit">
    <textarea class="user-text" @keydown="checkKey" @input="resizeTextArea" rows="4" v-model="userMsgField"
      ref="textarea" placeholder="Ask your question..."></textarea>
    <div class="msg-controls">
      <Button v-if="!messaging.isWaitingForResponse" class="submit-btn" type="submit"><i
          class="ri-send-plane-2-line ri-xl" /></Button>
      <Spinner v-else class="submit-btn w-6 h-6" />
    </div>
  </form>
</template>


<style scoped>
.user-input {
  @apply flex flex-col w-full rounded-b-lg border-t-2 border-primary bg-surface;
}

.user-text {
  @apply bg-background rounded-b-lg focus:shadow-primary focus:ring-0 focus:outline-none p-2;
}

.submit-btn {
  @apply mr-3
}

.role-selector {
  @apply text-white bg-overlay pl-1 focus:text-primary transition-all duration-300;
}

.msg-controls {
  @apply absolute bottom-1 right-2 items-center justify-between my-3
}

select {
  @appy focus:ring-0 active:ring-0;
}

select:not(:placeholder-shown) {
  border: none;
  outline: none;
}
</style>
