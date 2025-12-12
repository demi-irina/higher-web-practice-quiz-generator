export function cloneTemplateContent(template: HTMLTemplateElement): HTMLElement {
	const element = template.content.firstElementChild?.cloneNode(true) as HTMLElement | null;

	if (!element) {
		throw new Error("Clone template error");
	}

	return element;
}
