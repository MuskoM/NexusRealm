<script setup lang="ts">
import Button from './components/elements/Button.vue';
import { RouterLink, RouterView } from 'vue-router';
import NotificationHandler from './components/NotificationHandler.vue';
</script>

<template>
  <div class="app-body">
    <div class="router-wrapper">
      <div class="ability-router">
        <RouterLink to="/"><Button class="my-2 flex-1 w-full" :background="true">Sandbox</Button></RouterLink>
        <RouterLink to="/chat"><Button class="my-2 w-full" :background="true">Chat</Button></RouterLink>
      </div>
      <div class="router-footer">
        <RouterLink to="/settings"><Button class="my-2" :background="false"><i class="ri-settings-3-line ri-xl" /></Button></RouterLink>
      </div>
    </div>
    <div class="ability">
        <router-view/>
    </div>
    <NotificationHandler/>
  </div>

</template>

<style>
.app-body {
  @apply flex h-full flex-row justify-evenly bg-stone-800 text-white overflow-hidden max-w-full;
}

.router-wrapper {
  @apply flex flex-col justify-between items-center shadow-md shadow-stone-600;
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
