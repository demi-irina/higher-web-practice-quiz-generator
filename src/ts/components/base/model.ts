import type { AppEventName, IEvents, EventsMap, IModel } from "../../types";

export abstract class Model implements IModel {
	protected events: IEvents<EventsMap>;

	constructor(events: IEvents<EventsMap>) {
		this.events = events;
	}

	emitChanges<K extends AppEventName>(event: K, payload?: EventsMap[K]): void {
		this.events.emit(event, payload);
	}
}
