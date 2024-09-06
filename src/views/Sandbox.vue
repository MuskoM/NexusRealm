<script lang="ts" setup>
import Button from "../components/elements/Button.vue";
import MessageBox from "../components/MessageBox.vue";
import Sidebar from "../components/elements/Sidebar.vue"
import QueryInput from "../components/QueryInput.vue"
import { useMessageStore } from '../stores/messageStore.ts'
import { Message } from "../types/messaging.ts";
import { computed, ref } from "vue";
import ModelSelector from "../components/ModelSelector.vue";

const messaging = useMessageStore();
const sideBarRef = ref()

const messageList: Message[] = computed(()=>{
  return messaging.messages.slice()
})

const openSidebar = async () => {
  sideBarRef.value.changeSidebarState()
  console.log(selectedModel,selectedProvider)
}

const selectedModel = ref("");
const selectedProvider = ref("");

</script>

<template>
  <div class="flex flex-col-reverse px-3">
    <div class="ribbon"><Button @click="openSidebar"><i class="ri-settings-2-line" /></Button></div>
    <QueryInput class="relative bottom-0" inputType="sandbox" ></QueryInput>
    <div class="overflow-auto">
      <MessageBox :messageType="msg.role" :message="msg.content" :key="key" :msgId="key" v-for="msg, key in messageList"/>
    </div>
  <Sidebar ref="sideBarRef">
      <ModelSelector/>
    </Sidebar>
  </div>
  </template>

<style scoped>
.ribbon {
  @apply flex flex-row justify-end items-start m-0.5 p-1;
}
</style>