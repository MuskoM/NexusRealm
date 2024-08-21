use core::panic;
use std::fs;

use crate::models::settings::{ApiKeys, AppSettings};

const SETTINGS_RESOURCE: &'static str = "settings.yaml";

#[tauri::command]
pub fn read_settings(handle: tauri::AppHandle) -> AppSettings {
    let default_key_value = "No key".to_string();
    let default_settings = AppSettings {
        api_keys: ApiKeys {
            anthropic: default_key_value.clone(), 
            open_ai: default_key_value.clone(),
            local: default_key_value.clone(),
            custom_api: default_key_value.clone()
        }
    };
    // Open file from app directory
    let app_dir = handle.path_resolver().app_config_dir().unwrap();
    let settings_str = match fs::read_to_string(app_dir.join(SETTINGS_RESOURCE)) {
        Ok(string) => string,
        Err(_err) => serde_yml::to_string(&default_settings).unwrap()
    };

    let yaml = serde_yml::from_str(&settings_str);
    match yaml {
        Ok(result) => result,
        Err(err) => {
            println!("Unable to parse yaml file {}", err);
            default_settings
        }
    }
}

#[tauri::command]
pub fn save_settings(handle: tauri::AppHandle, settings: AppSettings) {
    let app_dir = handle.path_resolver().app_config_dir().unwrap();
    let settings_string = serde_yml::to_string(&settings).unwrap_or_else(|e| {e.to_string()});

    if !app_dir.exists() {
        fs::create_dir(&app_dir).unwrap_or_else(|_e| {panic!("Unable to create directory, check your permissions.")})
    }

    match fs::write(app_dir.join(SETTINGS_RESOURCE), settings_string) {
        Ok(..) => println!("Saved settings"),
        Err(e) => panic!("Error when saving settings to file: {}", e.to_string())
    };
}