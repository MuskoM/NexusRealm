<script setup lang="ts">
import {ref} from 'vue'
import {useMessageStore} from '../stores/messageStore.ts'

const messaging = useMessageStore()

const userMsgField = ref("")

const handleSubmit = async () => {
  if (userMsgField.value)
    await messaging.addMessage("user", userMsgField.value)
  await messaging.sendMessages()
}
</script>
<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <textarea rows="4" v-model="userMsgField" class="user-input" placeholder="Ask your question..."></textarea>
      <button class="submit-btn" type="submit"><i class="ri-send-plane-2-line ri-xl"/></button>
    </form>
  </div>
</template>


<style>
.container {
  @apply relative border-gray-500 rounded mr-2;
}

.container textarea {
  @apply border-2 p-2 rounded-md;
}

.submit-btn {
  @apply absolute bottom-5 right-5 hover:text-purple-500 transition-all ;
}

.user-input {
  @apply resize-y w-full;
}
</style>
