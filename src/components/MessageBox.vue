<script lang="ts" setup>
import {useMessageStore} from '../stores/messageStore.ts'
import { useModelStore } from '../stores/modelStore.ts';
import { Providers } from '../types/messaging.ts';
import Button from './elements/Button.vue';

const messaging = useMessageStore()
const models = useModelStore()
const props = defineProps<{
    messageType: string
    msgId: number
}>()

const removeMessageFromList = async () => {
    try {
        let removed = await messaging.removeMessage(props.msgId)
    } catch (e) {
        console.error("Unable to delete message with id", props.msgId)
    }
}
</script>

<template>
    <div :class="['flex flex-col outer', models.selectedModel?.provider === Providers.Anthropic ? 'outer-anthropic' : 'outer-open-ai'] ">
        <div class="info-bar">
            <div class="message-type-box">
                {{ props.messageType }}
            </div>
            <Button :background="true" @click="removeMessageFromList"><i class="ri-delete-bin-2-line"/></Button>
        </div>
        <div class="text-wrapper">
            <slot/>
        </div>
    </div>
</template>

<style scoped>
.outer {
    @apply w-full shadow-md mb-1 p-1 pt-3;
}

.outer-open-ai {
    @apply shadow-green-800
}

.outer-anthropic {
    @apply shadow-amber-800;
}

.text-wrapper {
    @apply m-2
}

.info-bar{
    @apply flex flex-row justify-between mr-4 ml-2;
}

.message-type-box {
    @apply text-purple-200 capitalize font-thin;
}

.close-btn {
    @apply cursor-pointer;
}
</style>