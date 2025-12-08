import { z } from "zod";

export const QuizOptionSchema = z.object({
	id: z.number(),
	text: z.string().nonempty(),
	correct: z.boolean(),
	message: z.string().nonempty()
});

export const QuizQuestionSchema = z.object({
	id: z.number(),
	text: z.string().nonempty(),
	type: z.enum(["single", "multiple"]),
	options: z.array(QuizOptionSchema).min(2)
});

export const QuizSchema = z.object({
	title: z.string().nonempty(),
	description: z.string().nonempty(),
	questions: z.array(QuizQuestionSchema).min(1)
});
