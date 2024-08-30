<script lang="ts" setup>
import {marked} from 'marked'
import { computed } from 'vue';

const renderOptions = {linkify: true, typographer: true,}

const props = defineProps<{
    text: string
}>()

const formattedText = computed(()=> {
    console.log(props.text)
    const newText = marked(props.text)
    console.log(newText)
    return newText
    })
</script>

<template>
<div class="markdown-text" v-html="formattedText"/>
</template>

<style scoped>
    h1 {
        @apply bg-green-500 font-bold text-xl
    }
</style>