<script setup lang="ts">
import { ref } from 'vue'
import { useMessageStore } from '../stores/messageStore.ts'
import Button from './Button.vue';
import Spinner from './elements/Spinner.vue';

const messaging = useMessageStore()
const userMsgField = ref("")
let waitingForResponse = ref(false)

const handleSubmit = async () => {
  waitingForResponse.value = true;

  if (userMsgField.value) {
    await messaging.addMessage("user", userMsgField.value)
    userMsgField.value = ""
    waitingForResponse.value = false;
  }
  await messaging.sendMessages()
}
</script>
<template>
  <form class="relative" @submit.prevent="handleSubmit">
    <textarea rows="4" v-model="userMsgField" class="user-input" placeholder="Ask your question..."></textarea>
    <Button v-if="!waitingForResponse" class="submit-btn" type="submit"><i class="ri-send-plane-2-line ri-xl" /></Button>
    <Spinner v-else class="submit-btn w-6 h-6"/>
  </form>
</template>


<style scoped>
form textarea {
  @apply p-2 bg-stone-700 shadow-md shadow-purple-600 focus:ring-0 focus:outline-none focus:shadow-xl focus:shadow-purple-500 transition-colors transition-shadow duration-300;
}

.submit-btn {
  @apply absolute bottom-5 right-5;
}

.user-input {
  @apply resize-y w-full;
}
</style>
