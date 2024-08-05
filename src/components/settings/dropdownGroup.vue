<script lang="ts" setup>
import InputWithLabel from '../elements/InputWithLabel.vue';
const props = defineProps(["settings"])
</script>

<template>
<div v-for="val,key in props.settings">
    <InputWithLabel type="text" class="my-2" :label="key" :value="val" ></InputWithLabel>
</div>
</template>