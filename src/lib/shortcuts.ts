import { globalShortcut } from '@tauri-apps/api';
import { window } from '@tauri-apps/api';
import { ShortcutHandler } from '@tauri-apps/api/globalShortcut';

interface Command {
  shortcut: string,
  handler: ShortcutHandler
}

// Commands
const bring_to_foreground_cmd = async () => {
  if (await window.appWindow.isVisible()) {
    await window.appWindow.hide()
  } else {
    await window.appWindow.show()
    await window.appWindow.setFocus()
  }
}

const cmds: Command[] = [
  {shortcut: "CommandOrControl+Shift+L", handler: bring_to_foreground_cmd},
]



cmds.forEach(async (command: Command)=> {
  if (!await globalShortcut.isRegistered(command.shortcut)) {
    console.log(command)
    await globalShortcut.register(command.shortcut,command.handler)
  }
  else
    console.warn(`Unable to register shortcut ${command.shortcut}, already registered`)
});
