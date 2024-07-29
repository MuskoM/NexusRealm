<script setup lang="ts">
import { ref } from "vue";
import QueryInput from "./components/QueryInput.vue"
import { invoke } from "@tauri-apps/api/tauri";

const output = ref("This will be output")

async function query_model() {
  console.log("Query_sent")
  output.value = await invoke("send_query", { query: "Hello" });
}
</script>

<template>
  <div class="flex flex-col items-center">
    <p> Here is history </p>
    <QueryInput :query_function=query_model></QueryInput>
  </div>
</template>
