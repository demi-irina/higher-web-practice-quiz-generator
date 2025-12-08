import { QuizSchema } from "../schema";
import type { QuizData } from "../types";

type ValidationResult = { isValid: false } | { isValid: true; data: QuizData };

export function validateQuizJson(jsonString: string): ValidationResult {
	let parsed: unknown;
	try {
		parsed = JSON.parse(jsonString);
	} catch (error) {
		return { isValid: false };
	}

	const result = QuizSchema.safeParse(parsed);

	if (!result.success) {
		return { isValid: false };
	}

	return { isValid: true, data: result.data };
}
