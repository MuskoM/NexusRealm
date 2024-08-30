<script lang="ts" setup>

    defineEmits(["click"])
    const props = defineProps<{
        type?: "submit" | "button" | "reset",
        background?: boolean,
    }>();

</script>

<template>
    <button :class="props.background ? 'bg-button': '' " :type="props.type ? props.type : 'button'" @click="$emit('click', $event.target)">
        <slot/>
    </button>
</template>

<style scoped>
    button {
        @apply transition-all duration-300 hover:text-primary rounded-md; 
    }

    .bg-button {
        @apply bg-surface shadow-sm shadow-stone-500 p-1.5 hover:shadow-md hover:shadow-primary; 
    }
</style>