import { globalShortcut } from '@tauri-apps/api';

interface Command {
  shortcut: string,
  function: Function
}

const cmds: List<Command> = [
  {shortcut: 'CommandOrControl+P', function: () => console.log('Global shortcut triggered')},
  {shortcut: 'CommandOrControl+Shift+L', function: () => console.log('Global shortcut triggered')}
]

cmds.forEach(async (command: Command)=> {
  if (!await globalShortcut.isRegistered(command.shortcut)) {
    console.log(command)
    await globalShortcut.register(command.shortcut,command.function)
  }
  else
    console.warn(`Unable to register shortcut ${command.shortcut}, already registered`)
});
