import { View } from "../base";
import type { QuizzesViewData, QuizzesViewSettings } from "../../types";

export class QuizzesView extends View<QuizzesViewData, QuizzesViewSettings> {
	private title: HTMLElement;
	private grid: HTMLElement;
	private empty: HTMLElement;

	constructor(element: HTMLElement, settings: QuizzesViewSettings) {
		super(element, settings);
		const title = element.querySelector<HTMLElement>(".quizzes__title");
		const grid = element.querySelector<HTMLElement>(".quizzes__grid");
		const empty = element.querySelector<HTMLElement>(".quizzes__empty");

		if (!title || !grid || !empty) {
			throw new Error("QuizzesView: required elements not found");
		}

		this.title = title;
		this.grid = grid;
		this.empty = empty;
	}

	render(data: QuizzesViewData): HTMLElement {
		const hasItems = data.cards.length > 0;

		this.title.hidden = !hasItems;
		this.empty.hidden = hasItems;

		if (hasItems) {
			this.grid.replaceChildren(...data.cards);
		} else {
			this.grid.replaceChildren();
		}

		return this.element;
	}
}
