import { globalShortcut } from '@tauri-apps/api';
import { readText } from '@tauri-apps/api/clipboard';
import { window } from '@tauri-apps/api';
import { ShortcutHandler } from '@tauri-apps/api/globalShortcut';

import { useMessageStore } from '../stores/messageStore';

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

const send_clipboard_to_model = async () => {
  const msgStore = useMessageStore();
  const content = await readText();
  console.log("MESSAGE FROM CLIPBOARD before: ", msgStore.messages)
  if (content) {
    //Fix: Brutal fix for working with Anthropic models, remove at a later date
    const nextRole = msgStore.messages[msgStore.messages.length - 1].role == 'user' ? 'assistant' : 'user'
    msgStore.addMessage(nextRole, content);
  }
  await msgStore.sendMessages();
  console.log("MESSAGE FROM CLIPBOARD: ", msgStore.messages)
}

const cmds: Command[] = [
  {shortcut: "CommandOrControl+Alt+;", handler: bring_to_foreground_cmd},
  {shortcut: "CommandOrControl+Alt+'", handler: send_clipboard_to_model},
]



cmds.forEach(async (command: Command)=> {
  if (!await globalShortcut.isRegistered(command.shortcut)) {
    console.log(command)
    await globalShortcut.register(command.shortcut,command.handler)
  }
  else
    console.warn(`Unable to register shortcut ${command.shortcut}, already registered`)
});
