<script lang="ts" setup>
import hljs from 'highlight.js'
import { useNexusRealmStore } from '../stores/realms/nexusRealmStore'
import { computed, onMounted } from 'vue';
import { useCommandStore } from '../stores/commandStore';

import { WebRealm } from '../lib/realms/web';

const commandStore = useCommandStore()

const realmStore = useNexusRealmStore()
const boardText = computed(() => {
  return hljs.highlightAuto(realmStore.realmBoardText).value
})

// Load Generic Incantations
onMounted(async () => {
  const webRealm = new WebRealm()
  webRealm.incantations.forEach(async (i) => {
    await commandStore.registerCommand(i)
  })
})

</script>

<template>
  <div class="wrapper">
    <div class="hello-screen">
      <div class="logo">
        <i class='ri-vuejs-line ri-lg' />
      </div>
    </div>
    <div class="realm-board" v-html="boardText">
    </div>
    <div class="shortcuts">
      <div><span class="key">Ctrl</span> + <span class="key">Shift</span> + <span class="key">k</span> - Toggle App
      </div>
      <div><span class="key">Ctrl</span> + <span class="key">Shift</span> + <span class="key">/</span> - Toggle Nexus
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col justify-between bg-background p-4
}

.hello-screen {
  @apply flex flex-col items-center
}

.realm-board {
  @apply bg-surface bg-overlay h-1/2 mx-3 rounded p-3 overflow-y-auto text-wrap
}

.shortcuts {
  @apply flex space-x-7 text-text
}

.key {
  @apply bg-secondary bg-opacity-40 text-text py-0.5 px-2 shadow-sm rounded
}
</style>
