import type { IView } from "../../types";

export abstract class View<T, S extends object> implements IView<T, S> {
	element: HTMLElement;
	protected settings: S;

	["constructor"]!: new (element: HTMLElement, settings: S) => this;

	constructor(element: HTMLElement, settings: S) {
		this.element = element;
		this.settings = settings;
	}

	render(_data?: T): HTMLElement {
		return this.element;
	}

	copy(settings?: Partial<S>): this {
		return new this.constructor(
			this.element.cloneNode(true) as HTMLElement,
			Object.assign({}, this.settings, settings ?? {})
		);
	}
}
