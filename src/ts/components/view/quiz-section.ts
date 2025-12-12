import { View } from "../base";
import type { IQuizSectionViewData, IQuizSectionViewSettings } from "../../types";

export class QuizSectionView extends View<IQuizSectionViewData, IQuizSectionViewSettings> {
	constructor(element: HTMLElement, settings: IQuizSectionViewSettings) {
		super(element, settings);
	}

	render(data: IQuizSectionViewData): HTMLElement {
		this.element.hidden = !data.isVisible;
		return this.element;
	}
}
