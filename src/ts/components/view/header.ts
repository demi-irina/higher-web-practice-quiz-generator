import { View } from "../base";
import type { HeaderViewData, HeaderViewSettings } from "../../types";

export class HeaderView extends View<HeaderViewData, HeaderViewSettings> {
	private menuButton: HTMLElement;
	private menuIcon: HTMLImageElement;
	private menuContainer: HTMLElement;

	constructor(element: HTMLElement, settings: HeaderViewSettings = {}) {
		super(element, settings);

		const menuButton = element.querySelector<HTMLElement>(".header__menu-button");
		const menuIcon = element.querySelector<HTMLImageElement>(".header__menu-icon");
		const menuContainer = element.querySelector<HTMLElement>(".header__menu-container");

		if (!menuButton || !menuIcon || !menuContainer) {
			throw new Error("HeaderView: required elements not found");
		}

		this.menuButton = menuButton;
		this.menuIcon = menuIcon;
		this.menuContainer = menuContainer;

		this.menuButton.addEventListener("click", () => this.toggle());

		const menuLinks = this.menuContainer.querySelectorAll(".header__menu-link");
		menuLinks.forEach((link) => {
			link.addEventListener("click", () => this.close());
		});
	}

	private get isOpen(): boolean {
		return this.menuContainer.classList.contains("header__menu-container--open");
	}

	render(data: HeaderViewData): HTMLElement {
		if (data.isOpen != null) {
			if (data.isOpen) {
				this.open();
			} else {
				this.close();
			}
		}
		return this.element;
	}

	private toggle(): void {
		if (this.isOpen) {
			this.close();
		} else {
			this.open();
		}
	}

	private open(): void {
		this.menuIcon.src = "./assets/cross.svg";
		this.menuContainer.classList.add("header__menu-container--open");
	}

	private close(): void {
		this.menuIcon.src = "./assets/burger.svg";
		this.menuContainer.classList.remove("header__menu-container--open");
	}
}
