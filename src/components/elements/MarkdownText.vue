<script lang="ts" setup>
import MarkdownIt from 'markdown-it';
import MarkdownItHighlight from 'markdown-it-highlightjs'
import MarkdownItTaskList from 'markdown-it-task-list'
import { computed } from 'vue';

const renderOptions = {linkify: true, typographer: true,}

const markdown = MarkdownIt(renderOptions)
                    .use(MarkdownItHighlight)
                    .use(MarkdownItTaskList)

const props = defineProps<{
    text: string
}>()

const formattedText = computed(()=> {
    console.log(props.text)
    const newText = markdown.render(props.text)
    console.log(newText)
    return newText
    })
</script>

<template>
<div v-html="formattedText"/>
</template>

<style scoped>
</style>