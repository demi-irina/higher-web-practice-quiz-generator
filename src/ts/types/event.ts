export interface QuizFormSubmitEvent {
	value: string;
}

export const EVENTS = {
	QUIZ_FORM_SUBMIT: "quiz.form:submit",
	TOAST_ACTION: "toast:action"
} as const;

export interface IEventsMap {
	[EVENTS.QUIZ_FORM_SUBMIT]: QuizFormSubmitEvent;
	[EVENTS.TOAST_ACTION]: undefined;
}

export type AppEventName = keyof IEventsMap;
