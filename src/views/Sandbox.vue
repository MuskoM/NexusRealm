<script lang="ts" setup>
import Button from "../components/elements/Button.vue";
import MessageBox from "../components/MessageBox.vue";
import Sidebar from "../components/elements/Sidebar.vue"
import QueryInput from "../components/QueryInput.vue"
import { useMessageStore } from '../stores/messageStore.ts'
import { Message } from "../types/messaging.ts";
import { ref } from "vue";
import DropdownSelector from "../components/elements/DropdownSelector.vue";

const messaging = useMessageStore();
const messages: Message[] = messaging.messages;
const sideBarRef = ref()

const openSidebar = async () => {
  sideBarRef.value.changeSidebarState()
  console.log(selection.value)
}

const selection = ref();

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
      <DropdownSelector v-model="selection">
        <option selected value="lofi">Lofi</option>
        <option value="hifi">Lofi</option>
        <option value="midfi">Midfi</option>
      </DropdownSelector>
    </Sidebar>
  </div>
</template>

<style scoped>
.ribbon {
  @apply flex flex-row justify-end items-start m-0.5 p-1;
}
</style>