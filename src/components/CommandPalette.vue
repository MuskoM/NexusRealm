<script setup lang='ts'>
import { ref, computed, watch, onUpdated, Ref } from "vue";
import Fuse from 'fuse.js'
import { useCommandStore } from "../stores/commandStore";
import { Incantation } from "../types/incantation";
import { useRouter } from "vue-router";

const commandStore = useCommandStore()
const router = useRouter()

let fuse = new Fuse(commandStore.commands, { keys: ['title', 'aliases', 'category'] })

watch(commandStore.commands, () => {
    fuse = new Fuse(commandStore.commands, { keys: ['title', 'aliases', 'category'] })
})

const commandText = ref("")
const commandInput = ref<HTMLInputElement>()

const matchedCommands = computed(() => {
    return fuse.search(commandText.value).map(found => { return found.item })
})

onUpdated(() => {
    setTimeout(() => commandInput.value!.focus(), 0)
})

const toggleFocus = () => {
    setTimeout(() => commandInput.value!.focus(), 0)
}

const executeCommand = async (cmd: Incantation) => {
    commandText.value = ''
    const output = cmd.handler(cmd.args, router)
    await commandStore.closeCommandPalette()
    return output
}

defineExpose({ toggleFocus })

</script>

<template>
    <div class="wrapper">
        <input ref="commandInput" tabindex='0' :class="['command-input', commandText != '' ? 'rounded-b-none' : '']"
            spellcheck="false" type="search" placeholder="Input command here..." v-model="commandText" />
        <div v-if="commandText !== ''" class="command-list">
            <button @click="() => executeCommand(cmd)" class="command" v-for="cmd in matchedCommands">{{
                cmd.title
            }}</button>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    @apply flex flex-col px-9;
}

.command-input {
    @apply text-lg text-text p-2 shadow-inner focus:outline-none focus:ring focus:ring-primary z-20 selection:bg-overlay;
}

.command-list {
    @apply flex flex-col items-start bg-surface text-text p-3 shadow shadow-primary rounded-b-md text-sm z-10 shadow-lg;

    button {
        @apply hover:text-text hover:bg-secondary hover:bg-opacity-40;
    }
}

.command {
    @apply w-full text-left p-1 hover:text-accent focus:outline-none focus:bg-secondary focus:bg-opacity-40;
}
</style>
