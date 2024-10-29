<script lang="ts" setup>
import MessageBox from "../components/MessageBox.vue";
import QueryInput from "../components/QueryInput.vue"
import { useAiRealmStore } from '../stores/realms/aiRealmStore'
import { Message } from "../types/ai.ts";
import { computed, ComputedRef } from "vue";
const messaging = useAiRealmStore();

const messageList: ComputedRef<Message[]> = computed(() => {
  return messaging.messages.slice()
})

</script>

<template>
  <div class="flex flex-col-reverse p-1">
    <QueryInput class="relative bottom-0"></QueryInput>
    <div class="overflow-auto">
      <MessageBox :messageType="msg.role" :message="msg.content" :key="key" :msgId="key"
        v-for="msg, key in messageList" />
    </div>
  </div>
</template>

<style scoped>
.ribbon {
  @apply flex flex-row justify-end items-start m-0.5 p-1;
}
</style>
