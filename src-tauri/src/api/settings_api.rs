use std::fs;
extern crate yaml_rust;
use yaml_rust::YamlLoader;

use crate::models::settings::{ApiKeys, AppSettings};

#[tauri::command]
pub fn read_settings(handle: tauri::AppHandle) -> AppSettings {
    let resoure_path = handle.path_resolver()
        .resolve_resource("settings.yaml")
        .expect("failed to resolve resource");
    let settings_str = match fs::read_to_string(resoure_path) {
        Ok(string) => string,
        Err(_err) => panic!("Unable to read file")
    };
    let yaml_docs = YamlLoader::load_from_str(settings_str.as_str());
    let settings = match &yaml_docs {
        Ok(yaml_result) => &yaml_result[0],
        Err(_err) => panic!("Unable to load settings file")
    };
    let keys_from_file = &settings["app_settings"]["api_keys"];
    println!("{:?}", keys_from_file);
    let api_keys = ApiKeys{
        open_ai: keys_from_file["open_ai"].as_str().unwrap_or("").to_string(),
        anthropic: keys_from_file["anthropic"].as_str().unwrap_or("").to_string(),
        local: keys_from_file["local"].as_str().unwrap_or("").to_string(),
        custom_api: keys_from_file["custom_api"].as_str().unwrap_or("").to_string()};
    AppSettings{api_keys: api_keys }
}

#[tauri::command]
pub fn save_settings(){

}