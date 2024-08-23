use serde_json::json;

use crate::models::messaging::{self as msg, AiModel, AnthropicMessage, MessageType, OpenAiChatResponse, Providers};
use crate::modules::app_settings::{self, get_settings};

fn handle_error_response(e: reqwest::Error) -> String {
    tracing::error!("{}", e);
    format!("{}", e)
}

pub async fn anthropic_send_messages(messages: Vec<msg::Message>, model: AiModel) -> Result<String, String> {
    let anthropic_api_key = get_settings().api_keys.anthropic;
    let client = reqwest::Client::new();

    tracing::debug!("Building a request(key={}, model={:?}, messages={:?})", anthropic_api_key, model, messages);
    let response = client.post("https://api.anthropic.com/v1/messages")
        .header("x-api-key", anthropic_api_key)
        .header("anthropic-version", "2023-06-01")
        .header("content-type", "application/json")
        .json(&json!({
            "model": model.value,
            "max_tokens": 1024,
            "messages": messages.iter().filter(|x| x.role != MessageType::System).map(|x| AnthropicMessage::from(x)).collect::<Vec<_>>()
        }))
        .send()
        .await
        .map_err(handle_error_response)?;

    tracing::debug!("Recieved response from Anthropic {:?}", response);
    let body = response
        .json::<msg::AnthropicChatResponse>()
        .await
        .map_err(handle_error_response)?;

    Ok(body.get_message())
}

pub async fn open_ai_send_messages(messages: Vec<msg::Message>, model: AiModel) -> Result<String, String> {
    let open_ai_api_key = app_settings::get_settings().api_keys.open_ai;
    let client = reqwest::Client::new();

    tracing::debug!("Building a request(key={}, model={:?}, messages={:?})",open_ai_api_key, model, messages);
    let response = client.post("https://api.openai.com/v1/chat/completions")
        .header("content-typ", "application/json")
        .header("authorization", format!("Bearer {}", open_ai_api_key)) 
        .json(&json!({
            "model": model.value,
            "messages": messages
        }))
        .send()
        .await
        .map_err(handle_error_response)?;

    let body = response
        .json::<OpenAiChatResponse>()
        .await
        .map_err(handle_error_response)?;

    Ok(body.get_message())
}

#[tauri::command]
pub async fn send_messages_to_model(
    messages: Vec<msg::Message>,
    model: AiModel,
) -> Result<String, String> {

    let model_output = match model.provider {
        Providers::Anthropic => {
            //Execute send for Anthropic
            anthropic_send_messages(messages, model).await?
        },
        Providers::OpenAi => {
            //Execute send for OpenAi
            open_ai_send_messages(messages, model).await?
        }
    };
    Ok(model_output)
}
