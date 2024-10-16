import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStateStore = defineStore('appState', () => {
  const nexusVisible = ref(true)
  const plainVisible = ref(false)

  const setNexusVisibility = (visible: boolean) => {
    nexusVisible.value = visible
  }

  const isNexusVisible = () => nexusVisible.value

  const setPlainVisibility = (visible: boolean) => {
    plainVisible.value = visible
  }

  const isPlainVisible = () => plainVisible.value

  return { isNexusVisible, setNexusVisibility, setPlainVisibility, isPlainVisible }
})
