<script lang="ts" setup>

const props = defineProps<{
    level: "error" | "warning" | "info"
}>()
</script>

<template>
    <div :class="['toast', `${props.level}`]"><slot/></div>
</template>

<style scoped>

.toast {
    @apply p-2 m-4 transition-all
}

.error {
    @apply shadow-lg shadow-red-600 bg-red-900;
}

.warning {
    @apply shadow-lg shadow-orange-600 bg-orange-900;
}

.info {
    @apply shadow-lg shadow-blue-600 bg-blue-900
}
</style>