import { View } from "../base";
import type { IQuizHeadViewData, IQuizHeadViewSettings } from "../../types";

export class QuizHeadView extends View<IQuizHeadViewData, IQuizHeadViewSettings> {
	private title: HTMLElement;
	private description: HTMLElement;

	constructor(element: HTMLElement, settings: IQuizHeadViewSettings) {
		super(element, settings);

		const title = element.querySelector<HTMLElement>(".quiz__title");
		const description = element.querySelector<HTMLElement>(".quiz__description");

		if (!title || !description) {
			throw new Error("QuizHeadView: required elements not found");
		}

		this.title = title;
		this.description = description;
	}

	render(data: IQuizHeadViewData): HTMLElement {
		this.title.textContent = data.title;
		this.description.textContent = data.description;

		return this.element;
	}
}
