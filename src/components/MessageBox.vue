<script lang="ts" setup>
import { computed } from 'vue';
import {useMessageStore} from '../stores/messageStore.ts'
import { useModelStore } from '../stores/modelStore.ts';
import { Providers } from '../types/messaging.ts';
import Button from './elements/Button.vue';
import MarkdownText from './elements/MarkdownText.vue';

const messaging = useMessageStore()
const models = useModelStore()
const props = defineProps<{
    message: string
    messageType: string
    msgId: number
}>()

const removeMessageFromList = async () => {
    try {
        await messaging.removeMessage(props.msgId)
    } catch (e) {
        console.error("Unable to delete message with id", props.msgId)
    }
}
</script>

<template>
    <div :class="['outer'] ">
        <div class="info-bar">
            <div class="message-type-box">
                {{ props.messageType }}
            </div>
            <Button :background="true" @click="removeMessageFromList"><i class="ri-delete-bin-2-line"/></Button>
        </div>
        <MarkdownText class="text-wrapper" :text="props.message"/>
    </div>
</template>

<style scoped>
.outer {
    @apply flex flex-col w-full mb-1 p-1 pt-3 max-w-full my-5;
}

.text-wrapper {
    @apply m-2
}

.info-bar{
    @apply flex flex-row justify-between mr-4 ml-2;
}

.message-type-box {
    @apply text-surface capitalize font-semibold font-mono border-2 border-surface p-1.5 opacity-80;
}

.close-btn {
    @apply cursor-pointer;
}
</style>