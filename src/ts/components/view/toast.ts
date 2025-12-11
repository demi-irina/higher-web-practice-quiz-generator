import { View } from "../base";
import type { IEvents, IEventsMap, IToastViewData, IToastViewSettings } from "../../types";
import { EVENTS } from "../../types";

export class ToastView extends View<IToastViewData, IToastViewSettings> {
	private events: IEvents<IEventsMap>;
	private title: HTMLElement;
	private message: HTMLElement;
	private actionButton: HTMLButtonElement;

	constructor(element: HTMLElement, settings: IToastViewSettings) {
		super(element, settings);

		this.events = settings.events;

		const title = element.querySelector<HTMLElement>(".toast__title");
		const message = element.querySelector<HTMLElement>(".toast__message");
		const actionButton = element.querySelector<HTMLButtonElement>(".toast__action");

		if (!title || !message || !actionButton) {
			throw new Error("ToastView: required elements not found");
		}

		this.title = title;
		this.message = message;
		this.actionButton = actionButton;

		this.actionButton.addEventListener("click", () => {
			this.events.emit(EVENTS.TOAST_ACTION);
		});
	}

	render(data: IToastViewData): HTMLElement {
		if (data.title != null) {
			this.title.textContent = data.title;
		}
		if (data.message != null) {
			this.message.textContent = data.message;
		}
		this.toggleToast(data.isVisible);
		return this.element;
	}

	private toggleToast(isVisible: boolean): void {
		this.element.hidden = !isVisible;
		this.element.classList.toggle("toast--visible", isVisible);
	}
}
