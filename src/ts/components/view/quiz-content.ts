import { View } from "../base";
import type {
	IEvents,
	IEventsMap,
	IQuizContentViewData,
	IQuizContentViewSettings
} from "../../types";
import { EVENTS } from "../../types";

export class QuizContentView extends View<IQuizContentViewData, IQuizContentViewSettings> {
	private events: IEvents<IEventsMap>;
	private questionContainer: HTMLElement;
	private form: HTMLFormElement;
	private submitButton: HTMLButtonElement;
	private nextButton: HTMLButtonElement;

	constructor(element: HTMLElement, settings: IQuizContentViewSettings) {
		super(element, settings);

		this.events = settings.events;

		const questionContainer = element.querySelector<HTMLElement>(".quiz__question");
		const form = element.querySelector<HTMLFormElement>(".quiz__form");
		const submitButton = element.querySelector<HTMLButtonElement>(".quiz__submit");
		const nextButton = element.querySelector<HTMLButtonElement>(".quiz__next");

		if (!questionContainer || !form || !submitButton || !nextButton) {
			throw new Error("QuizContentView: required elements not found");
		}

		this.questionContainer = questionContainer;
		this.form = form;
		this.submitButton = submitButton;
		this.nextButton = nextButton;

		this.form.addEventListener("submit", (event) => {
			event.preventDefault();
			const answer = new FormData(this.form).getAll("question").map(String);
			this.events.emit(EVENTS.QUIZ_ANSWER_SUBMIT, { answer });
		});

		this.nextButton.addEventListener("click", () => {
			this.events.emit(EVENTS.QUIZ_NEXT);
		});
	}

	render(data: IQuizContentViewData): HTMLElement {
		this.questionContainer.replaceChildren(data.questionElement);

		this.submitButton.hidden = !data.showSubmit;
		this.nextButton.hidden = !data.showNext;

		if (data.nextLabel) {
			this.nextButton.textContent = data.nextLabel;
		}

		if (data.showSubmit) {
			this.form.reset();
		}

		return this.element;
	}
}
