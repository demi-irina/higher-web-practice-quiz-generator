import { View } from "../base";
import type { IEvents, IEventsMap, IQuizCardViewData, IQuizCardViewSettings, QuizRecord } from "../../types";
import { EVENTS } from "../../types";

export class QuizCardView extends View<IQuizCardViewData, IQuizCardViewSettings> {
	private id: string | null = null;
	private events: IEvents<IEventsMap>;
	private title: HTMLElement;
	private description: HTMLElement;
	private count: HTMLElement;
	private action: HTMLElement;

	constructor(element: HTMLElement, settings: IQuizCardViewSettings) {
		super(element, settings);

		this.events = settings.events;

		const title = element.querySelector<HTMLElement>(".quiz-card__title");
		const description = element.querySelector<HTMLElement>(".quiz-card__description");
		const count = element.querySelector<HTMLElement>(".quiz-card__count");
		const action = element.querySelector<HTMLElement>(".quiz-card__action");

		if (!title || !description || !count || !action) {
			throw new Error("QuizCardView: required elements not found");
		}

		this.title = title;
		this.description = description;
		this.count = count;
		this.action = action;

		this.action.addEventListener("click", (event) => {
			event.preventDefault();
			if (this.id) {
				this.events.emit(EVENTS.QUIZ_START, { id: this.id });
			}
		});
	}

	render(data: QuizRecord): HTMLElement {
		this.id = data.id;
		this.title.textContent = data.title;
		this.description.textContent = data.description;
		this.count.textContent = `${data.questions.length} вопросов`;
		return this.element;
	}
}
