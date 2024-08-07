<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';

import DropdownSelector from './elements/DropdownSelector.vue';
import { useSettingsStore } from '../stores/settingsStore';

import axios from 'axios';

const settingsStore = useSettingsStore()
const defaultOpenAiModel = 'gpt-4o-mini'
const modelProviders = ["OpenAI", "Anthropic", "Local"]
const availableModels = ref<Array<string>>([])

onBeforeMount(async ()=>{
    await settingsStore.readSettings()
    try {
    const response = await axios.get("https://api.openai.com/v1/models", {
            headers: {
                'Authorization': `Bearer ${settingsStore.settings.apiKeys.openAi}`
            }
        })
    const models: Array<{id:string}> = response.data.data
    availableModels.value = models.filter(m=>m.id.startsWith('gpt')).map(m=>m.id).sort()
    } catch (e) {
        console.error("Unable to fetch available models", e)
    }
    
})

</script>

<template>
    <label>Provider</label>
    <DropdownSelector class="selector" :default="modelProviders[0]">
        <option v-for="provider in modelProviders">
            {{ provider }}
        </option>
    </DropdownSelector>
    <label>Model</label>
    <DropdownSelector class="selector" :default="defaultOpenAiModel">
        <option v-for="model in availableModels">
            {{ model }}
        </option>
    </DropdownSelector>
</template>

<style scoped>
.selector {
    @apply m-2 p-1
}
</style>