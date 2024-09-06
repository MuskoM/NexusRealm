<script lang="ts" setup>
import {Marked} from 'marked'
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { computed } from 'vue';

const renderOptions = {linkify: true, typographer: true,}

const marked = new Marked(
        markedHighlight({
            langPrefix: 'hljs language-',
            highlight(code, lang, info) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, {language}).value;
            }
        })
    )

const props = defineProps<{
    text: string
}>()

const formattedText = computed(()=> {
    return marked.parse(props.text)
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