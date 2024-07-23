<script setup lang="ts">
import { ref } from "vue";
import QueryInput from "./components/QueryInput.vue"
import { invoke } from "@tauri-apps/api/tauri";

const output = ref("This will be output")

async function query_model() {
  output.value = await invoke("send_query", { query: "Hello" });
}
</script>

<template>
  <div class="flex flex-col items-center">
    <p> Here is history </p>
    <QueryInput></QueryInput>
  </div>
</template>
