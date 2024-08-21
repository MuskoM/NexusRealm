use std::fmt;
use serde:: {Serialize, Deserialize};
use chrono::{DateTime, Utc};

// Base message struct
#[derive(Serialize, Deserialize, Debug)]
pub struct Message {
    pub message_id: Option<String>,
    pub conversation_id: Option<String>,
    #[serde(rename = "sentOn")]
    pub sent_on: DateTime<Utc>,
    pub role: MessageType,
    pub content: String
}

impl fmt::Display for Message {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "[{}](by={})", self.content, self.role)
    }
}

// Messages for Anthropic Models
#[derive(Debug, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "lowercase")]
pub struct AnthropicMessage {
    pub role: AnthropicMessageType,
    pub content: String
}

impl From<&Message> for AnthropicMessage {
    fn from(value: &Message) -> Self {
        Self {
            role: AnthropicMessageType::from(value.role.clone()),
            content: value.content.clone(),
        }
    }
}

// Message types for each of the model providers
#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
#[serde(rename_all = "lowercase")]
pub enum MessageType {
    System,
    User,
    Assistant,
}

#[derive(Debug, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "lowercase")]
pub enum AnthropicMessageType {
    User,
    Assistant
}

impl From<MessageType> for AnthropicMessageType {
   fn from(value: MessageType) -> Self {
       match value {
        MessageType::Assistant => AnthropicMessageType::Assistant,
        MessageType::System => AnthropicMessageType::User,
        _ => AnthropicMessageType::User,
       }
   } 
}

impl fmt::Display for MessageType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{:?}", self)
    }
}

// Response structs from models
#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
pub struct AnthropicResponse {
    id: String,
    #[serde(rename = "type")]
    pub msg_type: String,
    pub role: String,
    pub model: String,
    pub stop_reason: String,
    usage: AnthropicUsage,
    content: Vec<AnthropicContent>
}

impl AnthropicResponse {
    pub fn get_message(&self) -> String {
        self.content[0].text.clone()
    }
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
struct AnthropicUsage {
    pub input_tokens: u32,
    pub output_tokens: u32,
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
struct AnthropicContent {
    #[serde(rename = "type")]
    pub conten_type: String,
    pub text: String
}


#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
pub enum Providers {
    OpenAi,
    Anthropic,
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
struct Capabilities {
   multimodal: bool,
   function_calling: bool
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
pub struct AiModel {
    pub label: String,
    pub value: String,
    pub provider: Providers,
    capabilities: Capabilities
}