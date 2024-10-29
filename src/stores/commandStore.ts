import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Incantation } from '../types/incantation'
import { registerShortcut } from '../lib/shortcuts'
import { useAppStateStore } from './appStateStore';


const toggle_app = async () => {
  const appStateStore = useAppStateStore()
  // Check if on top
  // Yes
  if (await appStateStore.isAppVisible()) {
    //Check if window is focused
    if (await appStateStore.isAppFocused()) {
      // Yes
      await appStateStore.setAppVisible(false)
      appStateStore.setNexusVisibility(false)
    }
    else {
      // No
      await appStateStore.setAppFocus()
    }
    // No
  } else {
    // Show app and set focus on it
    await appStateStore.setAppVisible(true)
    await appStateStore.setAppFocus()
  }
}

const toggle_nexus = async () => {
  const appStateStore = useAppStateStore()
  appStateStore.setNexusVisibility(!appStateStore.isNexusVisible())
}


export const useCommandStore = defineStore('command', () => {
  const commands = ref<Incantation[]>([
    { title: 'Toggle Nexus', shortcut: "CommandOrControl+Shift+/", isGlobal: true, handler: toggle_nexus },
    { title: 'Toggle Realm', shortcut: "CommandOrControl+Shift+k", isGlobal: true, handler: toggle_app },
  ]
  )

  const registerCommand = async (command: Incantation) => {
    console.log('Registered', command.title)
    if ('shortcut' in command)
      await registerShortcut(command)
    commands.value.push(command)
  }

  const closeCommandPalette = async () => {
    const toggleCommand = commands.value.find(c => c.title === 'Toggle Nexus')
    if (toggleCommand)
      await toggleCommand.handler()
    else
      console.error('No toggle command registered')
  }

  commands.value.forEach(async (command: Incantation) => registerShortcut(command));
  return { commands, registerCommand, closeCommandPalette }
})

