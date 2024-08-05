<script setup lang="ts">
import { ref } from 'vue'
import { useMessageStore } from '../stores/messageStore.ts'
import Button from './elements/Button.vue';
import Spinner from './elements/Spinner.vue';

const messaging = useMessageStore()
const userMsgField = ref("")
const selectedRole = ref<"system" | "user" | "assistant">("user");

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
  await messaging.addMessage(selectedRole.value, userMsgField.value)
  userMsgField.value = ""
}

</script>
<template>
  <form class="relative" @submit.prevent="handleSubmit">
    <textarea rows="4" v-model="userMsgField" class="user-input" placeholder="Ask your question..."></textarea>
    <Button v-if="!messaging.isWaitingForResponse" class="submit-btn" type="submit"><i class="ri-send-plane-2-line ri-xl" /></Button>
    <Spinner v-else class="submit-btn w-6 h-6"/>
    <div class="msg-controls">
      <Button :background="true" @click="add_message" class="px-2 py-1.5 rounded-l-lg"><i class="ri-play-list-add-line ri-lg" /></Button>
      <select v-model="selectedRole" class="role-selector">
        <option disabled value="system">System</option>
        <option value="assistant">Assistant</option>
        <option selected value="user">User</option>
      </select>
    </div>
  </form>
</template>


<style scoped>
form textarea {
  @apply p-2 bg-stone-700 shadow-md rounded-lg shadow-purple-600 focus:ring-0 focus:outline-none focus:shadow-xl focus:shadow-purple-500 transition-colors transition-shadow duration-300;
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

.user-input {
  @apply resize-y w-full;
}
</style>
