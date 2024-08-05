export interface AppSettings {
    ApiKeys: ApiKeys
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
    openAI: string
    anthropic: string
    local: string
    customApi: string
}