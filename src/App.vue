<script setup lang="ts">
import { useMessageStore } from './stores/messageStore.ts'
import QueryInput from "./components/QueryInput.vue"
import MessageBox from "./components/MessageBox.vue";
import { Message } from "./types/messaging.ts";

const messaging = useMessageStore();
const messages: Message[] = messaging.messages;
</script>

<template>
  <div class="app-body">
    <div class="ability-router">
      <p>Ability A</p>
      <p>Ability B</p>
    </div>
    <div class="ability">
      <MessageBox :messageType="msg.role" :key="key" :msgId="key" v-for="msg, key in messages">
        {{ msg.content }}
      </MessageBox>
     <QueryInput class="user-input"></QueryInput>
    </div>
  </div>

</template>

<style>
.app-body {
  @apply flex h-full flex-row justify-evenly bg-stone-800 text-white;
}

.ability-router {
  @apply flex flex-col p-4 
}

.ability {
  @apply flex-1 overflow-auto p-5;
}
</style>