use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all="camelCase")]
pub struct ApiKeys {
    pub open_ai: String,
    pub anthropic: String,
    pub local: String,
    pub custom_api: String,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all="camelCase")]
pub enum AbilityType {
    Interface,
    Backend,
    InterfaceBackend
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all="camelCase")]
pub struct AppSettings {
    pub api_keys: ApiKeys,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all="camelCase")]
pub struct Ability {
    pub name: String,
    pub is_enabled: bool,
    pub is_root: bool,
    pub ability_type: AbilityType
}

