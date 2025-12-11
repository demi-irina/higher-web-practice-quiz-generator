import type { IEvents } from "./base";
import type { IEventsMap } from "./event";

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
