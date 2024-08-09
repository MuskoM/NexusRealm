import OpenAI from "openai";
import { AIModel, Message} from "../../types/messaging";
import { useSettingsStore } from "../../stores/settingsStore";


export const submitMessages = async (messages: Message[], model: AIModel) => {
    const settingsStore = useSettingsStore();
    await settingsStore.readSettings()
    let client = null
    let response = null
    client = new OpenAI({apiKey: settingsStore.settings.apiKeys.openAi, dangerouslyAllowBrowser: true})
    console.log(model.value)
    response = await client.chat.completions.create({
        model: model.value,
        messages: messages.map(msg=>{return{role: msg.role, content: msg.content}})
    })

    let output = response.choices[0].message.content
    if (output)
        return output
    else
        return "No response"
}