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
        @apply transition-all duration-300 hover:text-purple-500; 
    }

    .bg-button {
        @apply  rounded shadow-sm shadow-stone-500 p-1.5 hover:shadow-inner hover:shadow-purple-500;
    }
</style>