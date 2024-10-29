import { globalShortcut } from '@tauri-apps/api';
// import hotkeys from 'hotkeys-js'
import { Command } from '../types/command';
export const registerShortcut = async (command: Command) => {
  if (command.isGlobal)
    await registerGlobalShortcut(command)
  else { }

}

const registerGlobalShortcut = async (command: Command) => {
  if (!await globalShortcut.isRegistered(command.shortcut!)) {
    await globalShortcut.register(command.shortcut!, command.handler)
  }
  else
    console.warn(`Unable to register shortcut ${command.shortcut}, already registered`)
}

// const registerLocalShortcut = (command: Command) => {
// }
