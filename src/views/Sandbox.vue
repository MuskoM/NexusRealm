<script lang="ts" setup>
import Button from "../components/elements/Button.vue";
import MessageBox from "../components/MessageBox.vue";
import Sidebar from "../components/elements/Sidebar.vue"
import QueryInput from "../components/QueryInput.vue"
import { useMessageStore } from '../stores/messageStore.ts'
import { Message } from "../types/messaging.ts";
import { ref } from "vue";
import ModelSelector from "../components/ModelSelector.vue";

const messaging = useMessageStore();
const messages: Message[] = messaging.messages;
const sideBarRef = ref()

const openSidebar = async () => {
  sideBarRef.value.changeSidebarState()
}

const modelSelected = ref("");
const onModelSelected = async (selection: string) => {
  modelSelected.value = selection
}

</script>

<template>
  <div class="flex flex-row">
    <div class="flex-1 flex-col">
      <div class="ribbon"><Button @click="openSidebar"><i class="ri-settings-2-line" /></Button></div>
      <MessageBox :messageType="msg.role" :key="key" :msgId="key" v-for="msg, key in messages">
        {{ msg.content }}
      </MessageBox>
      <QueryInput></QueryInput>
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