import type { IEvents } from "./base";
import type { IEventsMap } from "./event";
import type { QuizOption, QuizQuestion, QuizRecord } from "./quiz";

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

export interface IOptionViewData {
	option: QuizOption;
	disabled: boolean;
	checked: boolean;
	result?: {
		text: string;
		isSuccess: boolean;
	};
}

export type IOptionViewSettings = IBaseViewSettings;

export interface IQuestionViewData {
	text: string;
	optionElements: HTMLElement[];
}

export type IQuestionViewSettings = IBaseViewSettings;

export interface IQuizContentViewData {
	questionElement: HTMLElement;
	questionType: QuizQuestion["type"];
	showSubmit: boolean;
	showNext: boolean;
	nextLabel?: string;
}

export type IQuizContentViewSettings = IBaseViewSettings;

export interface IQuizHeadViewData {
	title: string;
	description: string;
}

export type IQuizHeadViewSettings = IBaseViewSettings;

export interface IQuizProgressViewData {
	currentIndex: number;
	total: number;
}

export type IQuizProgressViewSettings = IBaseViewSettings;

export interface IQuizSectionViewData {
	isVisible: boolean;
}

export type IQuizSectionViewSettings = IBaseViewSettings;

export interface IModalViewData {
	data?: {
		title: string;
		subtitle: string;
		message: string;
	};
	isOpen: boolean;
}

export type IModalViewSettings = IBaseViewSettings;

export interface IHeaderViewData {
	isOpen?: boolean;
}

export type IHeaderViewSettings = object;
