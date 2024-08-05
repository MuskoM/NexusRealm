<script setup lang="ts">
import Button from './components/elements/Button.vue';
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="app-body">
    <div class="router-wrapper">
      <div class="ability-router">
        <RouterLink to="/"><Button class="my-2" :background="true"><img width="64px" height="64px" src="./assets/feather.svg" /></Button></RouterLink>
        <RouterLink to="/"><Button class="my-2" :background="true"><img width="64px" height="64px" src="./assets/feather.svg" /></Button></RouterLink>
        <RouterLink to="/"><Button class="my-2" :background="true"><img width="64px" height="64px" src="./assets/feather.svg" /></Button></RouterLink>
        <RouterLink to="/"><Button class="my-2" :background="true"><img width="64px" height="64px" src="./assets/feather.svg" /></Button></RouterLink>
      </div>
      <div class="router-footer">
        <RouterLink to="/settings"><Button class="my-2" :background="false"><i class="ri-settings-3-line ri-xl" /></Button></RouterLink>
      </div>
    </div>
    <div class="ability">
      <RouterView/>
    </div>
  </div>

</template>

<style>
.app-body {
  @apply flex h-full flex-row justify-evenly bg-stone-800 text-white overflow-hidden;
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