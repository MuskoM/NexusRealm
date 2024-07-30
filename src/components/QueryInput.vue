<script setup lang="ts">
import {ref} from 'vue'
import {useMessageStore} from '../stores/messageStore.ts'

const messaging = useMessageStore()

const userMsgField = ref("")

const props = defineProps<{
  query_function: Function,
}>();

const handleSubmit = () => {
  console.log("Called handleSubmit")
  messaging.addMessage('user', userMsgField.value)
  props.query_function()
}
</script>
<template>
  <div class="container">
    <form class="flex-1 justify-center" @submit.prevent="handleSubmit">
      <input v-model="userMsgField" class="flex-1" placeholder="Ask your question..."></input>
      <button class="send-btn" type="submit">|></button>
    </form>
  </div>
</template>


<style>
.container {
  @apply flex-1 shadow-md border border-gray-300 rounded;
}

.send-btn {
  @apply p-2 text-white bg-black rounded-md
}
</style>
