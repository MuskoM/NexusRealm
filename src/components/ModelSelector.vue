<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useModelStore } from '../stores/modelStore';
import { Providers } from '../types/messaging';
import DropdownSelector from './elements/DropdownSelector.vue';

const modelStore = useModelStore()

const selectedProvider = ref<Providers>(Providers.OpenAi);
const modelsToSelect = computed(()=>modelStore.availableModels.filter(model=>model.provider == selectedProvider.value))
const selectedModel = ref<string>("");

// Watch for changes in selectedProvider
watch(selectedProvider, () => {
  // Filter models for the new provider
  const availableModels = modelsToSelect.value;
  
  // Set the first model as default, if available
  if (availableModels.length > 0) {
    selectedModel.value = availableModels[0].value;
  } else {
    selectedModel.value = ""; // Reset if no models available
  }
}, { immediate: true }); // Immediate: true ensures it runs on component creation

watch(selectedModel, (newModel) => {
    modelStore.selectModel(newModel)
})

</script>

<template>
    <label>Provider</label>
    <DropdownSelector class="selector" v-model="selectedProvider" :options="Object.values(Providers).map(p=>{return {label:p, value:p}})">
    </DropdownSelector>
    <label>Model</label>
    <DropdownSelector class="selector" v-model="selectedModel" :options="modelsToSelect.map(m=>{return{ label: m.label, value: m.value }})"  >
    </DropdownSelector>
</template>

<style scoped>
.selector {
    @apply m-2 p-1
}
</style>