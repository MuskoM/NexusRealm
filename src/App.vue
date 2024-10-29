<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import NotificationHandler from './components/NotificationHandler.vue';
import CommandPalette from './components/CommandPalette.vue';
import { onMounted } from 'vue';
import { Category } from './types/incantation';
import { useCommandStore } from './stores/commandStore';
import { useAppStateStore } from './stores/appStateStore';
import { listen } from '@tauri-apps/api/event';

const commandStore = useCommandStore()
const appStateStore = useAppStateStore()
const router = useRouter()

const handleAppFocus = (event) => {
  console.log('State', appStateStore.appFocused)
  switch (event.event) {
    case 'tauri://focus':
      appStateStore.setAppFocused(true)
      break;
    case 'tauri://blur':
      appStateStore.setAppFocused(false)
      break;
  }
}

onMounted(async () => {
  await listen('tauri://focus', handleAppFocus)
  await listen('tauri://blur', handleAppFocus)
  await commandStore.registerCommand({
    title: 'Settings',
    aliases: ['Open Settings', 'Go to settings'],
    handler: async (_, r) => {
      await r.push('/settings')
      appStateStore.setNexusVisibility(false)
    },
    isGlobal: true,
  })
  await commandStore.registerCommand({
    title: 'Nexus Realm',
    aliases: ['Open home view', 'Go to nexus realm'],
    handler: async (_, r) => {
      await r.push('/')
      appStateStore.setNexusVisibility(false)
    },
    isGlobal: true,
  })
  await commandStore.registerCommand({
    title: 'AI Realm',
    aliases: ['Open ai view', 'Go to ai realm'],
    handler: async (_, r) => {
      await r.push('/ai')
      appStateStore.setNexusVisibility(false)
    },
    isGlobal: true,
  })
})

</script>

<template>
  <CommandPalette v-show="appStateStore.isNexusVisible()" class="command-palette" />
  <div class="app-body">
    <RouterView :class="['router-view', appStateStore.appFocused ? 'shadow-primary' : 'shadow-overlay']">
    </RouterView>
    <NotificationHandler />
  </div>
</template>

<style>
.app-body {
  @apply h-full text-text overflow-hidden max-w-full p-1 rounded-2xl z-0 transition-colors duration-1000;
}

.router-view {
  @apply rounded-2xl bg-background h-full shadow-2xl transition
}

.ability-router {
  @apply flex flex-col px-2 overflow-y-scroll;
  scrollbar-width: none;
}

.command-palette {
  @apply absolute top-16 w-full flex justify-center mt-3 p-3 z-50
}
</style>
