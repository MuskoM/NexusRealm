<script setup lang="ts">
import { ref } from 'vue'
import { useMessageStore } from '../stores/messageStore.ts'

const messaging = useMessageStore()

const userMsgField = ref("")

const handleSubmit = async () => {
  if (userMsgField.value)
    await messaging.addMessage("user", userMsgField.value)
  await messaging.sendMessages()
}
</script>
<template>
  <form class="relative" @submit.prevent="handleSubmit">
    <textarea rows="4" v-model="userMsgField" class="user-input" placeholder="Ask your question..."></textarea>
    <button class="submit-btn" type="submit"><i class="ri-send-plane-2-line ri-xl" /></button>
  </form>
</template>


<style>
form textarea {
  @apply p-2 bg-stone-700 shadow-md shadow-purple-600 focus:ring-0 focus:outline-none focus:shadow-xl focus:shadow-purple-500 transition-colors transition-shadow duration-300;
}

.submit-btn {
  @apply absolute bottom-5 right-5 hover:text-purple-500 transition-all;
}

.user-input {
  @apply resize-y w-full;
}
</style>
