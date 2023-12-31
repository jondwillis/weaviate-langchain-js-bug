// utils/llms.ts

// TODO: use APIs to list eligible models

export enum LLM {
  "embeddings" = "text-embedding-ada-002",
  "gpt-4" = "gpt-4",
  "gpt-4-0613" = "gpt-4-0613",
  "gpt-4-0314" = "gpt-4-0314",
  // "gpt-4-32k" = "gpt-4-32k",
  // "gpt-4-32k-0613" = "gpt-4-32k-0613",
  "gpt-3.5-turbo" = "gpt-3.5-turbo",
  "gpt-3.5-turbo-16k" = "gpt-3.5-turbo-16k",
  "gpt-3.5-turbo-0613" = "gpt-3.5-turbo-0613",
  "gpt-3.5-turbo-0301" = "gpt-3.5-turbo-0301",
  "gpt-3.5-turbo-16k-0613" = "gpt-3.5-turbo-16k-0613",
}

export const LLM_ALIASES = {
  fast: LLM["gpt-3.5-turbo"],
  "fast-large": LLM["gpt-3.5-turbo-16k"],
  smart: LLM["gpt-4-0613"],
  // "smart-large": LLM["gpt-4-32k"],
  embeddings: LLM["embeddings"],
};

export enum Temperature {
  Stable = "Stable",
  Balanced = "Balanced",
  Creative = "Creative",
}

export const TEMPERATURE_VALUES = {
  [Temperature.Stable]: 0,
  [Temperature.Balanced]: 0.4,
  [Temperature.Creative]: 0.9,
};

export enum AgentPromptingMethod {
  ZeroShotReAct = "Zero-shot ReAct",
  ChatZeroShotReAct = "Chat Zero-shot ReAct",
  ChatConversationalReAct = "Chat Conversational ReAct",
  PlanAndExecute = "Plan and Execute",
  OpenAIStructuredChat = "Structured Chat Zero Shot ReAct",
  OpenAIFunctions = "OpenAI Functions",
}

export const InitializeAgentExecutorOptionsAgentTypes = [
  "zero-shot-react-description",
  "chat-zero-shot-react-description",
  "chat-conversational-react-description",
] as const;

export const InitializeAgentExecutorOptionsStructuredAgentTypes = [
  "structured-chat-zero-shot-react-description",
  "openai-functions",
] as const;

export type InitializeAgentExecutorOptionsAgentType =
  (typeof InitializeAgentExecutorOptionsAgentTypes)[number];
export type InitializeAgentExecutorOptionsStructuredAgentType =
  (typeof InitializeAgentExecutorOptionsStructuredAgentTypes)[number];

export type AgentType =
  | InitializeAgentExecutorOptionsAgentType
  | InitializeAgentExecutorOptionsStructuredAgentType;

export function getAgentPromptingMethodValue(
  method: Exclude<AgentPromptingMethod, "PlanAndExecute">, // different AgentExecutor, see callExecutionAgent.ts
): AgentType | null {
  switch (method) {
    case AgentPromptingMethod.ZeroShotReAct:
      return "zero-shot-react-description";
    case AgentPromptingMethod.ChatZeroShotReAct:
      return "chat-zero-shot-react-description";
    case AgentPromptingMethod.ChatConversationalReAct:
      return "chat-conversational-react-description";
    case AgentPromptingMethod.OpenAIStructuredChat:
      return "structured-chat-zero-shot-react-description";
    case AgentPromptingMethod.OpenAIFunctions:
      return "openai-functions";
    case AgentPromptingMethod.PlanAndExecute:
      return null; //throw new Error("PlanAndExecute is not a valid prompting method");
  }
}

export interface Model {
  name: LLM;
  description: string;
  maxTokens: number;
  trainingData: string;
}

export interface Setting {
  name: string;
  value: string | LLM | Temperature;
  requiresAuth: boolean;
  setValue: (value: string | LLM | Temperature) => void;
}

export const llmResponseTokenLimit = (llm: string) => {
  switch (llm) {
    case LLM.embeddings:
      return 256;
    default:
      return -1;
  }
};

export const models: Model[] = [
  {
    name: LLM["gpt-4"],
    description:
      "More capable than any GPT-3.5 model, able to do more complex tasks, and optimized for chat. Will be updated with our latest model iteration 2 weeks after it is released.",
    maxTokens: 8192,
    trainingData: "Up to Sep 2021",
  },
  {
    name: LLM["gpt-4-0613"],
    description:
      "Snapshot of gpt-4 from June 13th 2023 with function calling data. Unlike gpt-4, this model will not receive updates, and will be deprecated 3 months after a new version is released.",
    maxTokens: 8192,
    trainingData: "Up to Sep 2021",
  },
  {
    name: LLM["gpt-4-0314"],
    description:
      "Snapshot of gpt-4 from March 14th 2023. Discontinues at earliest 06/13/2024.",
    maxTokens: 8192,
    trainingData: "Up to Sep 2021",
  },
  // {
  //   name: LLM["gpt-4-32k"],
  //   description:
  //     "Same capabilities as the base gpt-4 mode but with 4x the context length. Will be updated with our latest model iteration.",
  //   maxTokens: 32768,
  //   trainingData: "Up to Sep 2021",
  // },
  // {
  //   name: LLM["gpt-4-32k-0613"],
  //   description:
  //     "Snapshot of gpt-4-32 from June 13th 2023. Unlike gpt-4-32k, this model will not receive updates, and will be deprecated 3 months after a new version is released.",
  //   maxTokens: 32768,
  //   trainingData: "Up to Sep 2021",
  // },
  {
    name: LLM["gpt-3.5-turbo"],
    description:
      "Most capable GPT-3.5 model and optimized for chat at 1/10th the cost of text-davinci-003. Will be updated with our latest model iteration 2 weeks after it is released.",
    maxTokens: 4096,
    trainingData: "Up to Sep 2021",
  },
  {
    name: LLM["gpt-3.5-turbo-16k"],
    description:
      "Same capabilities as the standard gpt-3.5-turbo model but with 4 times the context.",
    maxTokens: 16384,
    trainingData: "Up to Sep 2021",
  },
  {
    name: LLM["gpt-3.5-turbo-0613"],
    description:
      "Snapshot of gpt-3.5-turbo from June 13th 2023 with function calling data. Unlike gpt-3.5-turbo, this model will not receive updates, and will be deprecated 3 months after a new version is released.",
    maxTokens: 4096,
    trainingData: "Up to Sep 2021",
  },
  {
    name: LLM["gpt-3.5-turbo-0301"],
    description:
      "Snapshot of gpt-3.5-turbo from March 1st 2023. Discontinues at earliest 06/13/2024.",
    maxTokens: 4096,
    trainingData: "Up to Sep 2021",
  },
  {
    name: LLM["gpt-3.5-turbo-16k-0613"],
    description:
      "Snapshot of gpt-3.5-turbo-16k from June 13th 2023. Unlike gpt-3.5-turbo-16k, this model will not receive updates, and will be deprecated 3 months after a new version is released.",
    maxTokens: 16384,
    trainingData: "Up to Sep 2021",
  },
];
