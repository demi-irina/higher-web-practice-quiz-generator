import type { IEvents } from "./base";
import type { IEventsMap } from "./event";

export interface IBaseViewSettings {
	events: IEvents<IEventsMap>;
}
