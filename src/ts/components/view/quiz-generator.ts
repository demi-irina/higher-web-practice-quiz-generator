import { View } from "../base";
import type { IEvents, EventsMap, QuizGeneratorViewData, QuizGeneratorViewSettings } from "../../types";
import { EVENTS } from "../../types";

export class QuizGeneratorView extends View<QuizGeneratorViewData, QuizGeneratorViewSettings> {
	private events: IEvents<EventsMap>;
	private form: HTMLFormElement;
	private textarea: HTMLTextAreaElement;

	constructor(element: HTMLElement, settings: QuizGeneratorViewSettings) {
		super(element, settings);

		this.events = settings.events;

		const form = element.querySelector<HTMLFormElement>(".generator__form");
		const textarea = form?.querySelector<HTMLTextAreaElement>("#quiz-json-input");

		if (!form || !textarea) {
			throw new Error("QuizFormView: required elements not found");
		}

		this.form = form;
		this.textarea = textarea;

		this.form.addEventListener("submit", (event) => {
			event.preventDefault();
			this.events.emit(EVENTS.QUIZ_FORM_SUBMIT, { value: this.textarea.value });
		});

		this.textarea.addEventListener("input", () => {
			this.textarea.classList.remove("generator__textarea--error");
		});
	}

	render(data: QuizGeneratorViewData): HTMLElement {
		if (data.value != null) {
			this.textarea.value = data.value;
		}
		if (data.isValid != null) {
			this.textarea.classList.toggle("generator__textarea--error", !data.isValid);
		}
		return this.element;
	}
}
