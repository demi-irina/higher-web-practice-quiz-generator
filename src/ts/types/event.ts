export interface QuizFormSubmitEvent {
	value: string;
}

export interface QuizStartEvent {
	id: string;
}

export const EVENTS = {
	QUIZ_FORM_SUBMIT: "quiz.form:submit",
	TOAST_ACTION: "toast:action",
	QUIZ_START: "quiz:start"
} as const;

export interface IEventsMap {
	[EVENTS.QUIZ_FORM_SUBMIT]: QuizFormSubmitEvent;
	[EVENTS.TOAST_ACTION]: undefined;
	[EVENTS.QUIZ_START]: QuizStartEvent;
}

export type AppEventName = keyof IEventsMap;
