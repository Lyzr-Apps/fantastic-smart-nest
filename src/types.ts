export interface PromptData {
  base_emotion: string;
  emotion_intensity: string;
  prompt_text: string;
  suggested_themes: string[];
  tone: string;
}

export interface Emotion2PromptResponse {
  prompt_data: PromptData;
  metadata: {
    processing_time: string;
    emoji_processed: string;
  };
}

export interface PoemData {
  title: string;
  content: string;
  style: string;
  stanza_count: number;
}

export interface PoemGeneratorResponse {
  poem_data: PoemData;
  metadata: {
    emotion_reflected: string;
    themes_used: string[];
    tone: string;
    generation_time: string;
  };
}