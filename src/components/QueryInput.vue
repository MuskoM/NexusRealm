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
  if (selectedProvider.value === Providers.Anthropic && messaging.messages.find(m=>m.role === 'system')) {
    await notify({level:"error", content: "Multiple System fields not allowed", visibleFor: 5000})  
    return
  }
  await messaging.addMessage(selectedRole.value, userMsgField.value)
  userMsgField.value = ""
}

</script>
<template>
  <form class="relative" @submit.prevent="handleSubmit">
    <textarea rows="4" v-model="userMsgField"
      :class="['user-input', selectedProvider === Providers.Anthropic ? 'anthropic' : 'open-ai']"
      placeholder="Ask your question..."></textarea>
    <Button v-if="!messaging.isWaitingForResponse" class="submit-btn" type="submit"><i
        class="ri-send-plane-2-line ri-xl" /></Button>
    <Spinner v-else class="submit-btn w-6 h-6" />
    <div class="msg-controls">
      <Button :background="true" @click="add_message" class="px-2 py-1.5 rounded-l-lg"><i
          class="ri-play-list-add-line ri-lg" /></Button>
      <select v-if="props.inputType === 'sandbox'" v-model="selectedRole" class="role-selector">
        <option value="system">System</option>
        <option value="assistant">Assistant</option>
        <option selected value="user">User</option>
      </select>
    </div>
  </form>
</template>


<style scoped>
.user-input {
  @apply resize-y w-full p-2 bg-stone-700 shadow-md rounded-lg focus:ring-0 focus:outline-none focus:shadow-xl transition-colors transition-shadow duration-300;
}

.open-ai {
  @apply shadow-green-600 focus:shadow-green-500;
}

.anthropic {
  @apply shadow-amber-600 focus:shadow-amber-500;
}

.submit-btn {
  @apply absolute bottom-5 right-5;
}

.role-selector {
  @apply text-white bg-stone-700 pl-1;
}

.msg-controls {
  @apply absolute bottom-5 left-5 rounded-lg border border-stone-500 shadow-inner shadow-sm;
}

select {
  @appy focus:ring-0 active:ring-0;
}

select:not(:placeholder-shown) {
  border: none;
  outline: none;
}
</style>
