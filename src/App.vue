<script setup lang="ts">
import { ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import NotificationHandler from './components/NotificationHandler.vue';
import CommandPalette from './components/CommandPalette.vue';
import { onMounted } from 'vue';
import { Category } from './types/command';
import { useCommandStore } from './stores/commandStore';
import { useAppStateStore } from './stores/appStateStore';

const commandStore = useCommandStore()
const appStateStore = useAppStateStore()
const router = useRouter()
const cmdPaletteRef = ref()

onMounted(async () => {
  await commandStore.registerCommand({
    title: 'Settings',
    aliases: ['Open Settings', 'Go to settings'],
    handler: async () => {
      console.log('Try to open settings')
      appStateStore.setPlainVisibility(true)
      await router.push('/settings')
    },
    category: Category.APP
  })
  await commandStore.registerCommand({
    title: 'Home',
    aliases: ['Open home view', 'Go to home'],
    handler: async () => {
      await router.push('/')
    },
    category: Category.APP
  })
})
</script>

<template>
  <RouterView v-if="appStateStore.isPlainVisible()" class="app-body">
  </RouterView>
  <NotificationHandler />
  <CommandPalette ref="cmdPaletteRef" v-show="appStateStore.isNexusVisible()" class="command-palette" />
</template>

<style>
.app-body {
  @apply h-full bg-background text-text overflow-hidden max-w-full z-0;
}

.ability-router {
  @apply flex flex-col px-2 overflow-y-scroll;
  scrollbar-width: none;
}

.command-palette {
  @apply w-full flex justify-center mt-3 p-3 z-50
}
</style>
