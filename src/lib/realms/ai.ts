import { invoke } from "@tauri-apps/api/tauri"
import { useAiRealmStore } from '../../stores/realms/aiRealmStore';
import { AIModel, Message } from "../../types/ai.ts"
import { Realm } from "./realm.ts";

export class AiRealm extends Realm {
    constructor() {
        super();
    }

    async submitMessages(messages: Message[], model: AIModel): Promise<void> {
        return await invoke('ai_send_messages_to_model', { messages: messages, model: model })
    }

    async send_clipboard_to_model(content: string) {
        const aiStore = useAiRealmStore();
        let nextRole: "user" | "system" | "assistant" = "user"
        if (aiStore.messages[aiStore.messages.length - 1])
            nextRole = aiStore.messages[aiStore.messages.length - 1].role == 'user' ? 'assistant' : 'user'

        aiStore.addMessage(nextRole, content);
        await aiStore.sendMessages();
        console.log("MESSAGE FROM CLIPBOARD: ", aiStore.messages)
    }
}


