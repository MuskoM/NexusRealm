<script setup lang="ts">
import { ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import NotificationHandler from './components/NotificationHandler.vue';
import CommandPalette from './components/CommandPalette.vue';
import { onMounted } from 'vue';
import { Category } from './types/command';
import { useCommandStore } from './stores/commandStore';

const commandStore = useCommandStore()
const router = useRouter()
const paletteShown = ref(false)
const cmdPaletteRef = ref()

onMounted(async () => {
  await commandStore.registerCommand({
    title: 'Toggle Command Palette',
    category: Category.APP,
    shortcut: 'CommandOrControl+K', handler: async () => {
      cmdPaletteRef.value.toggleFocus()
      paletteShown.value = !paletteShown.value
    }
  })
  await commandStore.registerCommand({
    title: 'Settings',
    aliases: ['Open Settings', 'Go to settings'],
    handler: async () => {
      console.log(router.getRoutes())
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
  <RouterView class="app-body">
  </RouterView>
  <NotificationHandler />
  <CommandPalette ref="cmdPaletteRef" v-show="paletteShown" class="command-palette" />
</template>

<style>
.app-body {
  @apply h-full bg-background text-text overflow-hidden max-w-full;
}

.router-wrapper {
  @apply absolute bottom-0 left-0 flex flex-col justify-between items-center shadow-md shadow-stone-600;
}

.ability-router {
  @apply flex flex-col px-2 overflow-y-scroll;
  scrollbar-width: none;
}

.command-palette {
  @apply absolute top-0 w-full flex justify-center mt-3 p-3
}

.ability {
  @apply flex-1 overflow-auto p-4;
}
</style>
