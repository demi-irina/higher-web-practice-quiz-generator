import { HeaderView, QuizGeneratorView, ToastView } from "../components/view";
import { QuizGeneratorModel } from "../components/model";
import { quizDatabase } from "../utils/storage";
import { EVENTS } from "../types";
import { events } from "../utils/events";

const header = document.querySelector<HTMLElement>(".header");
const generator = document.querySelector<HTMLElement>(".generator");
const toastContainer = document.querySelector<HTMLElement>("#error-toast");

if (!header || !generator || !toastContainer) {
	throw new Error("MainPage: required elements not found.");
}

new HeaderView(header);
const generatorView = new QuizGeneratorView(generator, { events });
const toastView = new ToastView(toastContainer, { events });
const generatorModel = new QuizGeneratorModel(quizDatabase, events);

events.on(EVENTS.QUIZ_FORM_SUBMIT, async ({ value }) => {
	await generatorModel.submitQuiz(value);
});

events.on(EVENTS.QUIZ_SAVE_SUCCESS, async () => {
	window.location.href = "./quizzes.html";
});

events.on(EVENTS.QUIZ_SAVE_FAILED, () => {
	toastView.render({
		title: "Ошибка: не удалось сохранить квиз.",
		message: "Произошла ошибка при сохранении в базу данных.",
		isVisible: true
	});
	generatorView.render({ isValid: false });
});

events.on(EVENTS.QUIZ_VALIDATION_FAILED, () => {
	toastView.render({
		title: "Ошибка: не удалось обработать JSON.",
		message: "Проверьте формат данных и попробуйте снова.",
		isVisible: true
	});
	generatorView.render({ isValid: false });
});

events.on(EVENTS.TOAST_ACTION, () => {
	toastView.render({ isVisible: false });
	generatorView.render({ isValid: true });
});
