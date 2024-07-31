use serde_json::json;

use crate::models::messaging::{self as msg, AnthropicMessage, AnthropicResponse, MessageType};
const API_KEY: &str = "";

#[tauri::command]
pub async fn send_messages_to_model(
    messages: Vec<msg::Message>,
    model_name: Option<String>,
) -> Result<String, String> {
    let api_key: String = std::env::var("ANTHROPIC_AI_KEY").unwrap_or_else(|_| {
        eprintln!("ANTHROPIC_API_KEY not set in environment");
        std::process::exit(1);
    });
    println!("{:?}", model_name);
    let model = match model_name {
        Some(name) => name,
        _ => "gpt-4o-mini".to_string(),
    };

    let client = reqwest::Client::new();
    let response = client.post("https://api.anthropic.com/v1/messages")
        .header("x-api-key", api_key)
        .header("anthropic-version", "2023-06-01")
        .header("content-type", "application/json")
        .json(&json!({
            "model": "claude-3-5-sonnet-20240620",
            "max_tokens": 1024,
            "system": messages.iter().find(|&x| x.role == MessageType::System).unwrap().content,
            "messages": messages.iter().filter(|x| x.role != MessageType::System).map(|x| AnthropicMessage::from(x)).collect::<Vec<_>>()
        }))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    let body = response
        .json::<msg::AnthropicResponse>()
        .await
        .map_err(|e| e.to_string())?;

    Ok(body.get_message())
}
