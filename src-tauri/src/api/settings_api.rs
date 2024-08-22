use crate::models::settings::{ApiKeys, AppSettings};
use crate::modules::app_settings;


#[tauri::command]
pub fn read_settings() -> AppSettings {
   app_settings::get_settings() 
}

#[tauri::command]
pub fn save_settings(settings: AppSettings) {
   app_settings::update_settings(settings) 
}