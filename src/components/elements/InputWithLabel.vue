<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps(["type","label", "value"])

const inputValue = ref(props.value);

</script>
<template>
<div class="flex flex-row items-center">
    <label class="mr-2 w-24 text-clip" for="user-input">{{ props.label }}</label>
    <input :type="props.type" id="user-input" v-model="inputValue"/>
</div>
</template>

<style scoped>
input {
    @apply bg-stone-700 rounded-md p-1.5;
}
</style>