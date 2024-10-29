import { AIModel, Providers } from "../types/ai"
export const availableModels: Array<AIModel> = [
    // OpenAi
    { label: 'GPT 4', value: 'gpt-4', provider: Providers.OpenAi, capabilities: {} },
    { label: 'GPT 4o', value: 'gpt-4o', provider: Providers.OpenAi, capabilities: { multimodal: true } },
    { label: 'GPT 4o Mini', value: 'gpt-4o-mini', provider: Providers.OpenAi, capabilities: { multimodal: true } },

    // Anthropic
    { label: 'Claude Sonnet 3.5', value: 'claude-3-5-sonnet-20240620', provider: Providers.Anthropic, capabilities: { multimodal: true } },
    { label: 'Claude Haiku 3.0', value: 'claude-3-haiku-20240307', provider: Providers.Anthropic, capabilities: { multimodal: false } }
]
