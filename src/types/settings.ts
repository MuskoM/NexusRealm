export interface AppSettings {
    apiKeys: ApiKeys
}

export enum AbilityType {
    Interface,
    Backend,
    InterfaceBackend,
}

export interface Ability {
    name: string,
    isEnabled: boolean,
    isRoot: boolean,
    ability_type: AbilityType
}

export interface ApiKeys {
    openAi: string
    anthropic: string
    local: string
    customApi: string
}