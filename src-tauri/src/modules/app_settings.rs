use std::fs;
use std::path::PathBuf;
use tauri;

use crate::constants::APP_NAME;
use crate::models::settings::{ApiKeys, AppSettings};

const SETTINGS_RESOURCE: &'static str = "settings.yaml";

pub fn get_config_dir() -> PathBuf {
    let user_config_dir = match tauri::api::path::app_config_dir(&tauri::Config::default()) {
        Option::Some(user_conf_dir) => user_conf_dir,
        Option::None => panic!("Unable to resolve configuartion directory!"),
    };
    user_config_dir.join(APP_NAME)
}

pub fn get_settings() -> AppSettings {
    let default_key_value = "<Provide key>".to_string();
    let default_settings = AppSettings {
        api_keys: ApiKeys {
            anthropic: default_key_value.clone(),
            open_ai: default_key_value.clone(),
            local: default_key_value.clone(),
            custom_api: default_key_value.clone(),
        },
    };
    // Open file from app directory
    let app_dir = get_config_dir();
    let settings_str = match fs::read_to_string(app_dir.join(SETTINGS_RESOURCE)) {
        Ok(string) => string,
        Err(_err) => serde_yml::to_string(&default_settings).unwrap(),
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

pub fn update_settings(updated_settings: AppSettings) {
    let app_dir = get_config_dir();
    let settings_string = serde_yml::to_string(&updated_settings).unwrap_or_else(|e| e.to_string());

    if !app_dir.exists() {
        fs::create_dir(&app_dir)
            .unwrap_or_else(|_e| panic!("Unable to create directory, check your permissions."))
    }

    match fs::write(app_dir.join(SETTINGS_RESOURCE), settings_string) {
        Ok(..) => println!("Saved settings {}", app_dir.to_string_lossy()),
        Err(e) => panic!("Error when saving settings to file: {}", e.to_string()),
    };
}

