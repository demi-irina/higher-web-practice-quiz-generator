import type { IEvents } from "./base";
import type { EventsMap } from "./event";
import type { QuizOption, QuizQuestion, QuizRecord } from "./quiz";

export interface BaseViewSettings {
	events: IEvents<EventsMap>;
}

export interface QuizGeneratorViewData {
	value?: string;
	isValid?: boolean;
}

export type QuizGeneratorViewSettings = BaseViewSettings;

export interface ToastViewData {
	title?: string;
	message?: string;
	isVisible: boolean;
}

export type ToastViewSettings = BaseViewSettings;

export type QuizCardViewData = QuizRecord;

export type QuizCardViewSettings = BaseViewSettings;

export interface QuizzesViewData {
	cards: HTMLElement[];
}

export type QuizzesViewSettings = BaseViewSettings;

export interface OptionViewData {
	option: QuizOption;
	disabled: boolean;
	checked: boolean;
	result?: {
		text: string;
		isSuccess: boolean;
	};
}

export type OptionViewSettings = BaseViewSettings;

export interface QuestionViewData {
	text: string;
	optionElements: HTMLElement[];
}

export type QuestionViewSettings = BaseViewSettings;

export interface QuizContentViewData {
	questionElement: HTMLElement;
	questionType: QuizQuestion["type"];
	showSubmit: boolean;
	showNext: boolean;
	nextLabel?: string;
}

export type QuizContentViewSettings = BaseViewSettings;

export interface QuizHeadViewData {
	title: string;
	description: string;
}

export type QuizHeadViewSettings = BaseViewSettings;

export interface QuizProgressViewData {
	currentIndex: number;
	total: number;
}

export type QuizProgressViewSettings = BaseViewSettings;

export interface QuizSectionViewData {
	isVisible: boolean;
}

export type QuizSectionViewSettings = BaseViewSettings;

export interface ModalViewData {
	data?: {
		title: string;
		subtitle: string;
		message: string;
	};
	isOpen: boolean;
}

export type ModalViewSettings = BaseViewSettings;

export interface HeaderViewData {
	isOpen?: boolean;
}

export type HeaderViewSettings = object;
