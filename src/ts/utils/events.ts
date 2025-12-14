import type { EventName, EventsMap, IEvents, Subscriber } from "../types";

class EventEmitter<T extends object> implements IEvents<T> {
	private _events: {
		[K in EventName<T>]?: Set<Subscriber<T, K>>;
	};

	constructor() {
		this._events = {};
	}

	on<K extends EventName<T>>(eventName: K, callback: Subscriber<T, K>): void {
		if (!this._events[eventName]) {
			this._events[eventName] = new Set();
		}
		this._events[eventName].add(callback);
	}

	off<K extends EventName<T>>(eventName: K, callback: Subscriber<T, K>): void {
		const set = this._events[eventName];
		if (!set) return;

		set.delete(callback);

		if (set.size === 0) {
			delete this._events[eventName];
		}
	}

	emit<K extends EventName<T>>(eventName: K, data?: T[K]): void {
		this._events[eventName]?.forEach((callback) => {
			callback(data as T[K]);
		});
	}

	offAll(): void {
		this._events = {};
	}
}

export const events = new EventEmitter<EventsMap>();
