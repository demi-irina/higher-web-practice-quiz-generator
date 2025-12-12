import { View } from "../base";
import type { IEvents, IEventsMap, IModalViewData, IModalViewSettings } from "../../types";
import { EVENTS } from "../../types";

export class ModalView extends View<IModalViewData, IModalViewSettings> {
	private events: IEvents<IEventsMap>;
	private title: HTMLElement;
	private subtitle: HTMLElement;
	private message: HTMLElement;
	private restartButton: HTMLButtonElement;

	constructor(element: HTMLElement, settings: IModalViewSettings) {
		super(element, settings);

		this.events = settings.events;

		const title = element.querySelector<HTMLElement>(".modal__title");
		const subtitle = element.querySelector<HTMLElement>(".modal__subtitle");
		const message = element.querySelector<HTMLElement>(".modal__message");
		const restartButton = element.querySelector<HTMLButtonElement>(".modal__restart");

		if (!title || !subtitle || !message || !restartButton) {
			throw new Error("ResultModalView: required elements not found");
		}

		this.title = title;
		this.subtitle = subtitle;
		this.message = message;
		this.restartButton = restartButton;

		this.restartButton.addEventListener("click", () => {
			this.events.emit(EVENTS.QUIZ_RESTART);
		});
	}

	render(data: IModalViewData): HTMLElement {
		if (data.data) {
			this.title.textContent = data.data.title;
			this.subtitle.textContent = data.data.subtitle;
			this.message.textContent = data.data.message;
		}

		this.toggleModal(data.isOpen);

		return this.element;
	}

	private toggleModal(isOpen: boolean): void {
		this.element.hidden = !isOpen;
		this.element.classList.toggle("modal--open", isOpen);
	}
}
