<script setup lang="ts">
import Button from './components/Button.vue';
import Sandbox from './views/Sandbox.vue';
</script>

<template>
  <div class="app-body">
    <div class="ability-router">
      <Button :background="true"><img width="64px" height="64px" src="./assets/feather.svg"/></Button>
    </div>
    <div class="ability">
      <Sandbox/>
    </div>
  </div>

</template>

<style>
.app-body {
  @apply flex h-full flex-row justify-evenly bg-stone-800 text-white;
}

.ability-router {
  @apply flex flex-col pt-3 pl-3
}

.ability {
  @apply flex-1 overflow-auto p-3;
}
</style>