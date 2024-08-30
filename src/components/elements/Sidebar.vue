<script lang="ts" setup>
import { ref } from 'vue';
import Button from './Button.vue';

const configSidebarVisible = ref(false);
const changeSidebarState = async () => {
    configSidebarVisible.value = configSidebarVisible.value ? false : true
}

defineExpose({ changeSidebarState })
</script>
<template>
    <div :class="['sidebar', configSidebarVisible ? 'sidebar-visible' : 'invisible']">
        <div class="wrapper">
            <Button class="flex justify-end m-2" @click="changeSidebarState"><i class="ri-close-line" /></Button>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    @apply flex flex-col p-4;
}

.sidebar {
    @apply w-0 h-full right-0 top-0 absolute bg-overlay transition-all duration-300 overflow-hidden shadow-md shadow-stone-600;
}

.sidebar-visible {
    @apply visible w-48
}
</style>
