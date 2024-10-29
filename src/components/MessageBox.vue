<script lang="ts" setup>
import { useAiRealmStore } from '../stores/realms/aiRealmStore'
import Button from './elements/Button.vue';
import MarkdownText from './elements/MarkdownText.vue';

const messaging = useAiRealmStore()
const props = defineProps<{
    message: string
    messageType: string
    msgId: number
}>()

</script>

<template>
    <div :class="['outer']">
        <div class="info-bar">
            <div class="message-type-box">
                {{ props.messageType }}
            </div>
        </div>
        <MarkdownText class="text-wrapper" :text="props.message" />
    </div>
</template>

<style scoped>
.outer {
    @apply flex flex-col w-full mb-1 p-1 pt-3 max-w-full my-5;
}

.text-wrapper {
    @apply m-2
}

.info-bar {
    @apply flex flex-row justify-between mr-4 ml-2;
}

.message-type-box {
    @apply text-surface capitalize font-semibold font-mono border-2 border-surface p-1.5 opacity-80;
}

.close-btn {
    @apply cursor-pointer;
}
</style>
