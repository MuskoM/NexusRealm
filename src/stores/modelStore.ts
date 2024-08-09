import {defineStore} from "pinia"
import { computed, ref } from "vue"
import { AIModel, Providers} from "../types/messaging";
import { availableModels as models } from "../constants/models";

export const useModelStore = defineStore("model", ()=>{

    const selectedModel = ref<AIModel | undefined>(models.find(m=>m.label.includes('4o Mini')));

    const selectModel = (modelName: string) => {
        selectedModel.value = models.find(m=>m.value === modelName || m.label === modelName)
    }

    const availableProviders = computed(()=>{
        return Object.values(Providers)
    })

    const availableModels = computed(()=>{
        return models
    })

    return {selectedModel, selectModel, availableProviders, availableModels}
});