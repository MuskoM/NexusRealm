import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Category, Command } from '../types/command'
import { registerShortcut } from '../lib/shortcuts'
import { readText } from '@tauri-apps/api/clipboard';
import { window } from '@tauri-apps/api';
import { useMessageStore } from '../stores/messageStore';
import { useAppStateStore } from './appStateStore';


const bring_to_foreground_cmd = async () => {
  console.log('Execute toggle')
  const appStateStore = useAppStateStore()
  if (await window.appWindow.isVisible()) {
    console.log('Try to toggle nexus')
    const nexusState = appStateStore.isNexusVisible()
    appStateStore.setPlainVisibility(nexusState)
    appStateStore.setNexusVisibility(!nexusState)
  } else {
    await window.appWindow.show()
    await window.appWindow.setFocus()
  }
}

const send_clipboard_to_model = async () => {
  const msgStore = useMessageStore();
  const content = await readText();
  if (content) {
    //Fix: Brutal fix for working with Anthropic models, remove at a later date
    let nextRole: "user" | "system" | "assistant" = "user"
    if (msgStore.messages[msgStore.messages.length - 1])
      nextRole = msgStore.messages[msgStore.messages.length - 1].role == 'user' ? 'assistant' : 'user'

    msgStore.addMessage(nextRole, content);
  }
  await msgStore.sendMessages();
  console.log("MESSAGE FROM CLIPBOARD: ", msgStore.messages)
}

export const useCommandStore = defineStore('command', () => {
  const commands = ref<Command[]>([
    { title: 'Toggle Command Palette', category: Category.APP, shortcut: "CommandOrControl+K", handler: bring_to_foreground_cmd },
    { title: 'Send clipboard to model', category: Category.APP, shortcut: "CommandOrControl+Alt+'", handler: send_clipboard_to_model },
  ]
  )

  const registerCommand = async (command: Command) => {
    console.log('Registered', command.title)
    if ('shortcut' in command)
      await registerShortcut(command)
    commands.value.push(command)
    console.log(commands.value)
  }

  const closeCommandPalette = async () => {
    const toggleCommand = commands.value.find(c => c.title === 'Toggle Command Palette')
    if (toggleCommand)
      await toggleCommand.handler()
    else
      console.error('No toggle command registered')
  }

  commands.value.forEach(async (command: Command) => registerShortcut(command));
  return { commands, registerCommand, closeCommandPalette }
})

