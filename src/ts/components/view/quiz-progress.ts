import { View } from "../base";
import type { QuizProgressViewData, QuizProgressViewSettings } from "../../types";

export class QuizProgressView extends View<QuizProgressViewData, QuizProgressViewSettings> {
	private progressText: HTMLElement;
	private progressBar: HTMLProgressElement;

	constructor(element: HTMLElement, settings: QuizProgressViewSettings) {
		super(element, settings);

		const progressText = element.querySelector<HTMLElement>(".quiz__progress-text");
		const progressBar = element.querySelector<HTMLProgressElement>(".quiz__progress-bar");

		if (!progressText || !progressBar) {
			throw new Error("QuizProgressView: required elements not found");
		}

		this.progressText = progressText;
		this.progressBar = progressBar;
	}

	render(data: QuizProgressViewData): HTMLElement {
		this.progressBar.max = data.total;
		this.progressBar.value = data.currentIndex + 1;
		this.progressText.textContent = `Вопрос ${data.currentIndex + 1} из ${data.total}`;

		return this.element;
	}
}
