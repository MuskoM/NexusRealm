<script setup lang='ts'>
import { ref, computed, watch } from "vue";
import Fuse from 'fuse.js'
import { useCommandStore } from "../stores/commandStore";
import { Command } from "../types/command";

const commandStore = useCommandStore()

let fuse = new Fuse(commandStore.commands, { keys: ['title', 'aliases', 'category'] })

watch(commandStore.commands, () => {
    fuse = new Fuse(commandStore.commands, { keys: ['title', 'aliases', 'category'] })
})

const commandText = ref("")
const input = ref()
const matchedCommands = computed(() => {
    return fuse.search(commandText.value).map(found => { return found.item })
})

const toggleFocus = () => {
    setTimeout(() => input.value.focus(), 0)
}

const executeCommand = async (cmd: Command) => {
    commandText.value = ''
    cmd.handler()
    await commandStore.closeCommandPalette()
}

defineExpose({ toggleFocus })

</script>

<template>
    <div class="wrapper">
        <input ref="input" tabindex='0' class="command-input" type="search" placeholder="Input command here..."
            v-model="commandText" />
        <div v-if="commandText != ''" class="command-list">
            <li @click="() => executeCommand(cmd)" class="command" v-for="cmd in matchedCommands">{{ cmd.title }}</li>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    @apply flex flex-col px-9
}

.command-input {
    @apply rounded-b-none text-lg text-text
}

.command-list {
    @apply bg-overlay text-text p-3 rounded-b-md text-sm
}

.command {
    @apply list-none hover:text-accent cursor-pointer
}
</style>
