<script lang="ts" setup>
import {useMessageStore} from '../stores/messageStore.ts'

const messaging = useMessageStore()
const props = defineProps<{
    messageType: string
    msgId: number
}>()

const removeMessageFromList = async () => {
    try {
        let removed = await messaging.removeMessage(props.msgId)
        console.log(removed)
    } catch (e) {
        console.error("Unable to delete message with id", props.msgId)
    }
}

</script>

<template>
    <div class="flex flex-col outer">
        <div class="info-bar">
            <div class="message-type-box">
                {{ props.messageType }}
            </div>
            <button @click="removeMessageFromList"><i class="ri-delete-bin-2-line"/></button>
        </div>
        <div class="text-wrapper">
            <slot />
        </div>
    </div>
</template>

<style>
.outer {
    @apply w-full border-2 p-1 pt-3 rounded-md;
}

.text-wrapper {
    @apply m-2
}

.info-bar{
    @apply flex flex-row justify-between mr-4 ml-2;
}

.message-type-box {
    @apply text-slate-400;
}

.close-btn {
    @apply cursor-pointer;
}
</style>