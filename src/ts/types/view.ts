import type { IEvents } from "./base";
import type { IEventsMap } from "./event";
import { QuizRecord } from "./quiz";

export interface IBaseViewSettings {
	events: IEvents<IEventsMap>;
}

export interface IQuizGeneratorViewData {
	value?: string;
	isValid?: boolean;
}

export type IQuizGeneratorViewSettings = IBaseViewSettings;

export interface IToastViewData {
	title?: string;
	message?: string;
	isVisible: boolean;
}

export type IToastViewSettings = IBaseViewSettings;

export type IQuizCardViewData = QuizRecord;

export type IQuizCardViewSettings = IBaseViewSettings;

export interface IQuizzesViewData {
	cards: HTMLElement[];
}

export type IQuizzesViewSettings = IBaseViewSettings;
