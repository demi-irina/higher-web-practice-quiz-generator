import { View } from "../base";
import type { IQuestionViewData, IQuestionViewSettings } from "../../types";

export class QuestionView extends View<IQuestionViewData, IQuestionViewSettings> {
	private readonly questionText: HTMLElement;
	private readonly optionsContainer: HTMLElement;

	constructor(element: HTMLElement, settings: IQuestionViewSettings) {
		super(element, settings);

		const questionText = element.querySelector<HTMLElement>(".question__text");
		const optionsContainer = element.querySelector<HTMLElement>(".question__options");

		if (!questionText || !optionsContainer) {
			throw new Error("QuestionView: required elements not found");
		}

		this.questionText = questionText;
		this.optionsContainer = optionsContainer;
	}

	render(data: IQuestionViewData): HTMLElement {
		this.questionText.textContent = data.text;
		this.optionsContainer.replaceChildren(...data.optionElements);
		return this.element;
	}
}
