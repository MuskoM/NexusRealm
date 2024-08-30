<script lang="ts" setup>

const props = defineProps(["modelValue", "type","label", "value"])
const emit = defineEmits(["update:modelValue"])

</script>
<template>
<div class="flex flex-row items-center">
    <label class="mr-2 w-24 text-clip" for="user-input">{{ props.label }}</label>
    <input :type="props.type" id="user-input" :value="props.modelValue.value ? props.modelValue.value : props.modelValue" @change="e=>emit('update:modelValue', e.target as HTMLInputElement)"/>
</div>
</template>

<style scoped>
input {
    @apply bg-surface rounded-md p-1.5;
}
</style>