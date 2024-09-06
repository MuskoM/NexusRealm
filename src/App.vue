<script setup lang="ts">
import Button from './components/elements/Button.vue';
import { RouterLink, RouterView } from 'vue-router';
import NotificationHandler from './components/NotificationHandler.vue';
</script>

<template>
  <RouterView class="app-body">
  </RouterView>
  <NotificationHandler/>
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

.router-footer {
}

.ability {
  @apply flex-1 overflow-auto p-4;
}
</style>
