import type { AppEventName, EventsMap } from "./event";

export type EventName<T extends object> = keyof T;
export type Subscriber<T extends object, K extends EventName<T>> = (event: T[K]) => void;

export interface IEvents<T extends object> {
	on<K extends EventName<T>>(eventName: K, callback: Subscriber<T, K>): void;

	off<K extends EventName<T>>(eventName: K, callback: Subscriber<T, K>): void;

	emit<K extends EventName<T>>(eventName: K, data?: T[K]): void;

	offAll(): void;
}

export interface IView<T, S extends object> {
	element: HTMLElement;

	copy(settings?: Partial<S>): IView<T, S>;

	render(data?: T): HTMLElement;
}

export interface IModel {
	emitChanges<K extends AppEventName>(event: K, payload?: EventsMap[K]): void;
}
