import { ChatOpenAI } from "@langchain/openai";

import { ChatOllama } from "@langchain/community/chat_models/ollama";

const chatModel = new ChatOllama({
	baseUrl: "http://127.0.0.1:11434",
	model: "mistral",
	cache: true
});

const chatModelOpenAI = new ChatOpenAI({
	openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY,
	temperature: 0.9,
	apiKey: process.env.REACT_APP_OPENAI_API_KEY,
	model: "gpt-3.5-turbo",
	cache: true
});

export const cronToText = async (cron: string): Promise<string> => {
	try {
		const openai_response = await chatModelOpenAI.invoke(
			`I want to schedule multiple events based on the provided CRON string: "${cron}". Could you please convert this CRON string to a text schedule? Please encaspulate the text in a code block.`
		);
		const response = openai_response.content as string;
		const cronString = response.split("```")[1];
		if (cronString.startsWith("plaintext ")) {
			return cronString.replace("plaintext ", "");
		}
		return cronString;
	} catch (error) {
		console.error(error);
		return `Error converting CRON string ${cron} to text: ${error}`;
	}
};

export const textToCron = async (text: string): Promise<string> => {
	try {
		const openai_response = await chatModelOpenAI.invoke(
			`I want to schedule multiple events based on the provided repeating schedule: "${text}". Could you please convert this text to a CRON string? Please encaspulate the CRON string in a code block.`
		);
		const response = openai_response.content as string;
		const cronString = response.split("```")[1];
		return cronString;
	} catch (error) {
		console.error(error);
		return `Error converting text ${text} to CRON string: ${error}`;
	}
};

export const rruleToCron = async (rruleStr: string): Promise<string> => {
	try {
		const openai_response = await chatModelOpenAI.invoke(`Could you please translate the RRule string "${rruleStr}" to a CRON string?`);
		const response = openai_response.content as string;
		return response;
	} catch (error) {
		console.error(error);
		return `Error converting RRule string ${rruleStr} to CRON string: ${error}`;
	}
};
