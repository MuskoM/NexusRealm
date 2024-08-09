<script lang="ts" setup>
const props = defineProps({
    modelValue: String,
    options: {
        type: Array<{value: string, label: string}>,
        default: () => [],
    }
})

const emit = defineEmits(["update:modelValue"])

</script>
<template>
    <select @change="e=>emit('update:modelValue',(e.target as HTMLSelectElement).value)" :value="props.modelValue" class="role-selector">
        <option v-for="option in props.options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
</template>

<style scoped>
.role-selector {
    @apply text-white bg-stone-700 rounded-md shadow-inner shadow-stone-500;
}

select {
    @appy focus:ring-0 active:ring-0;
}

select:not(:placeholder-shown) {
    border: none;
    outline: none;
}
</style>