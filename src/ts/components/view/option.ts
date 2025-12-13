import { View } from "../base";
import type { IOptionViewData, IOptionViewSettings } from "../../types";

export class OptionView extends View<IOptionViewData, IOptionViewSettings> {
	private input: HTMLInputElement;
	private label: HTMLLabelElement;
	private text: HTMLElement;
	private message: HTMLElement;

	constructor(element: HTMLElement, settings: IOptionViewSettings) {
		super(element, settings);

		const input = element.querySelector<HTMLInputElement>(".option__input");
		const label = element.querySelector<HTMLLabelElement>(".option__label");
		const text = element.querySelector<HTMLElement>(".option__text");
		const message = element.querySelector<HTMLElement>(".option__message");

		if (!input || !label || !text || !message) {
			throw new Error("OptionView: required elements not found");
		}

		this.input = input;
		this.label = label;
		this.text = text;
		this.message = message;
	}

	render(data: IOptionViewData): HTMLElement {
		const { option, disabled, checked, result } = data;

		this.input.value = String(option.id);
		this.input.disabled = disabled;
		this.input.checked = checked;

		this.text.textContent = option.text;

		this.renderResult(result);

		return this.element;
	}

	private renderResult(result?: { text: string; isSuccess: boolean }): void {
		this.label.classList.remove("option__label--success", "option__label--error");
		this.input.classList.remove("checkbox--success", "checkbox--error", "radio--success", "radio--error");

		if (!result) {
			this.message.textContent = "";
			this.message.hidden = true;
			return;
		}

		this.message.hidden = false;
		this.message.textContent = result.text;

		const modifier = result.isSuccess ? "success" : "error";
		this.label.classList.add(`option__label--${modifier}`);

		if (this.input.classList.contains("checkbox")) {
			this.input.classList.add(`checkbox--${modifier}`);
		} else if (this.input.classList.contains("radio")) {
			this.input.classList.add(`radio--${modifier}`);
		}
	}
}
