// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod api;
mod models;
mod tray;
mod modules;
mod constants;

use tauri::{Manager, SystemTrayEvent};
use tracing_subscriber;

use crate::tray::initialize_tray;
fn main() {
    tauri::Builder::default()
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                event.window().hide().unwrap();
                api.prevent_close();
            }
            _ => {}
        })
        .setup(|_app| {
            tracing_subscriber::fmt().with_max_level(tracing::Level::DEBUG).init();
            tracing::trace!("Setup hook run");
            Ok(())
        })
        .system_tray(initialize_tray())
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::DoubleClick {
                position: _,
                size: _,
                ..
            } => {
                let window = app.get_window("main").unwrap();
                window.show().unwrap();
                tracing::info!("Clicked");
            }
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                _ => {}
            },
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![
            api::model_api::send_messages_to_model,
            // api::system_api::bring_app_to_foreground,
            api::settings_api::read_settings,
            api::settings_api::save_settings,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
