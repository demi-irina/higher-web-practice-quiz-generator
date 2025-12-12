import { z } from "zod";
import { QuizOptionSchema, QuizQuestionSchema, QuizSchema } from "../schema";
import type { DBSchema } from "idb";

export type QuizOption = z.infer<typeof QuizOptionSchema>;
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;
export type QuizData = z.infer<typeof QuizSchema>;

export type QuizAnswerResult = {
	isCorrect: boolean;
	texts: {
		id: number;
		message: string;
		isSuccess: boolean;
	}[];
};

export interface QuizRecord extends QuizData {
	id: string;
}

export interface QuizDB extends DBSchema {
	quizzes: {
		key: string;
		value: QuizRecord;
	};
}
