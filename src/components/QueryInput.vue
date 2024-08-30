<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMessageStore } from '../stores/messageStore.ts'
import { useModelStore } from '../stores/modelStore.ts';
import Button from './elements/Button.vue';
import Spinner from './elements/Spinner.vue';
import { Providers } from '../types/messaging.ts';
import { notify } from '../lib/appNotifications.ts';

const props = defineProps<{
  inputType: "chat" | "sandbox"
}>()

const messaging = useMessageStore()
const models = useModelStore()
const userMsgField = ref("")
const textarea = ref(null)
const selectedRole = ref<"system" | "user" | "assistant">("user");
const selectedProvider = computed(() => {
  return models.selectedModel?.provider
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
  <form class="user-input"
    @submit.prevent="handleSubmit">
    <textarea class="user-text" @input="resizeTextArea" rows="4" v-model="userMsgField" ref="textarea"
      placeholder="Ask your question..."></textarea>
    <div class="msg-controls">
      <div class="ml-2 ring-2 p-2 rounded-md ring-stone-800">
      <Button :background="true" @click="add_message" class="px-2 py-1.5 rounded-l-lg"><i
          class="ri-play-list-add-line ri-lg" /></Button>
      <select v-if="props.inputType === 'sandbox'" v-model="selectedRole" class="role-selector">
        <option value="system">System</option>
        <option value="assistant">Assistant</option>
        <option selected value="user">User</option>
      </select>
</div>
      <Button v-if="!messaging.isWaitingForResponse" class="submit-btn" type="submit"><i
          class="ri-send-plane-2-line ri-xl" /></Button>
      <Spinner v-else class="submit-btn w-6 h-6" />
    </div>
  </form>
</template>


<style scoped>
.user-input {
  @apply flex flex-col w-full p-2 bg-overlay shadow-md rounded-lg;
}

.user-text {
  @apply bg-background  focus:shadow-primary 
  focus:ring-0 focus:outline-none shadow-inner-unactive focus:shadow-inner-active
  transition-colors transition-shadow duration-300
  p-2;
}

.submit-btn {
  @apply mr-3
}

.role-selector {
  @apply text-white bg-overlay pl-1 focus:text-primary transition-all duration-300;
}

.msg-controls {
  @apply flex flex-row items-center justify-between my-3
}

select {
  @appy focus:ring-0 active:ring-0;
}

select:not(:placeholder-shown) {
  border: none;
  outline: none;
}
</style>
