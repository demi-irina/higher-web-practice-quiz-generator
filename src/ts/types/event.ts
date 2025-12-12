import type { QuizAnswerResult, QuizQuestion } from "./quiz";

export interface QuizFormSubmitEvent {
	value: string;
}

export interface QuizStartEvent {
	id: string;
}

export interface QuizAnswerSubmitEvent {
	answer: string[];
}

export interface QuizSessionStartedEvent {
	title: string;
	description: string;
	total: number;
}

export interface QuizSessionUpdatedEvent {
	question: QuizQuestion;
	currentIndex: number;
	total: number;
}

export interface QuizAnswerResultEvent {
	question: QuizQuestion;
	result: QuizAnswerResult;
	answer: string[];
	isLast: boolean;
}

export interface QuizSessionFinishedEvent {
	correctCount: number;
	total: number;
}

export const EVENTS = {
	QUIZ_FORM_SUBMIT: "quiz.form:submit",
	TOAST_ACTION: "toast:action",
	QUIZ_START: "quiz:start",
	QUIZ_ANSWER_SUBMIT: "quiz.answer:submit",
	QUIZ_NEXT: "quiz:next",
	QUIZ_RESTART: "quiz:restart",
	QUIZ_SESSION_STARTED: "quiz.session:started",
	QUIZ_SESSION_UPDATED: "quiz.session:updated",
	QUIZ_ANSWER_RESULT: "quiz.answer:result",
	QUIZ_SESSION_FINISHED: "quiz.session:finished"
} as const;

export interface IEventsMap {
	[EVENTS.QUIZ_FORM_SUBMIT]: QuizFormSubmitEvent;
	[EVENTS.TOAST_ACTION]: undefined;
	[EVENTS.QUIZ_START]: QuizStartEvent;
	[EVENTS.QUIZ_ANSWER_SUBMIT]: QuizAnswerSubmitEvent;
	[EVENTS.QUIZ_NEXT]: undefined;
	[EVENTS.QUIZ_RESTART]: undefined;
	[EVENTS.QUIZ_SESSION_STARTED]: QuizSessionStartedEvent;
	[EVENTS.QUIZ_SESSION_UPDATED]: QuizSessionUpdatedEvent;
	[EVENTS.QUIZ_ANSWER_RESULT]: QuizAnswerResultEvent;
	[EVENTS.QUIZ_SESSION_FINISHED]: QuizSessionFinishedEvent;
}

export type AppEventName = keyof IEventsMap;
