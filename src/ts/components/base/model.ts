import type { AppEventName, IEvents, IEventsMap, IModel } from "../../types";

export abstract class Model implements IModel {
	protected events: IEvents<IEventsMap>;

	constructor(events: IEvents<IEventsMap>) {
		this.events = events;
	}

	emitChanges<K extends AppEventName>(event: K, payload?: IEventsMap[K]): void {
		this.events.emit(event, payload);
	}
}
