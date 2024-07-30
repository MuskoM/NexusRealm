<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/tauri";
import {useMessageStore} from './stores/messageStore.ts'
import QueryInput from "./components/QueryInput.vue"

const messaging = useMessageStore();

const messages = messaging.messages;

async function query_model() {
  console.log("Query_sent")
  output.value = await invoke("send_query", { query: "Hello" });
}
</script>

<template>
  <div class="flex flex-col items-center">
    <p v-for="msg in messages">{{msg.text}}</p>
    <QueryInput :query_function=query_model></QueryInput>
  </div>
</template>
