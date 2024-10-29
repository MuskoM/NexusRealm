import { ref } from 'vue'
import { defineStore } from 'pinia'
import { window } from '@tauri-apps/api'

export const useAppStateStore = defineStore('appState', () => {
  const nexusVisible = ref(false)
  const appFocused = ref(true)
  const nexusRef = ref()

  const setAppFocused = (val: boolean) => { appFocused.value = val }

  const isNexusVisible = () => nexusVisible.value

  const setNexusVisibility = (visible: boolean) => {
    nexusVisible.value = visible
  }

  const isAppFocused = async () => await window.appWindow.isFocused()

  const setAppFocus = async () => {
    await window.appWindow.setFocus()
  }

  const isAppVisible = async () => await window.appWindow.isVisible()

  const setAppVisible = async (visible: boolean) => {
    if (visible)
      await window.appWindow.show()
    else
      await window.appWindow.hide()
  }

  return { nexusRef, isNexusVisible, setNexusVisibility, setAppFocus, isAppFocused, isAppVisible, setAppVisible, appFocused, setAppFocused }
})
