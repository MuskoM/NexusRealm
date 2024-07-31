<script setup lang="ts">
import { useMessageStore } from './stores/messageStore.ts'
import QueryInput from "./components/QueryInput.vue"
import MessageBox from "./components/MessageBox.vue";
import { Message } from "./types/messaging.ts";

const messaging = useMessageStore();
const messages: Message[] = messaging.messages;


</script>

<template>
    <div class="m-2">
      <MessageBox :messageType="msg.role" :key="key" :msgId="key" v-for="msg, key in messages">
        {{ msg.content }}
      </MessageBox>
    <QueryInput class="mt-2 ml-2"></QueryInput>
  </div>
</template>
