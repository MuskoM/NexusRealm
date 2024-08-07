<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps<{
    default?: string
}>()

const emit = defineEmits(["selected"])
const selection = ref<string>(props.default ? props.default : "");

const selected = async () => {
    emit("selected", selection.value)
}

</script>
<template>
    <select @change="selected" v-model="selection" class="role-selector">
        <slot></slot>
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