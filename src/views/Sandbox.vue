<script lang="ts" setup>
import QueryInput from "../components/QueryInput.vue"
import MessageBox from "../components/MessageBox.vue";
import { useMessageStore } from '../stores/messageStore.ts'
import { Message } from "../types/messaging.ts";

const messaging = useMessageStore();
const messages: Message[] = messaging.messages;
</script>

<template>
      <MessageBox :messageType="msg.role" :key="key" :msgId="key" v-for="msg, key in messages">
        {{ msg.content }}
      </MessageBox>
     <QueryInput class="user-input"></QueryInput>
</template>