import { ChatOpenAI } from "@langchain/openai";

import { ChatOllama } from "@langchain/community/chat_models/ollama";

const chatModel = new ChatOllama({
	baseUrl: "http://127.0.0.1:11434",
	model: "mistral",
	cache: true
});

const chatModelOpenAI = new ChatOpenAI({
	openAIApiKey: "sk-pratyush-LfIF12ZpdW3pL1E76jxyT3BlbkFJYYO9FgxQ8AaorKDbMLvQ",
	temperature: 0.9,
	apiKey: "sk-pratyush-LfIF12ZpdW3pL1E76jxyT3BlbkFJYYO9FgxQ8AaorKDbMLvQ",
	model: "gpt-3.5-turbo",
	cache: true
});

export const rruleToCron = async (rruleStr: string): Promise<string> => {
	const openai_response = await chatModel.invoke(
		`Please convert the RRule string ${rruleStr} to CRON string. Please output the cron string in double quotes.`
	);
	const response = openai_response.content as string;
	const startIndex = response.indexOf('"');
	const endIndex = response.lastIndexOf('"');
	return response.slice(startIndex + 1, endIndex);
};
