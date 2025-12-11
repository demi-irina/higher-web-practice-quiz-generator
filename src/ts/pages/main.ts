import { QuizGeneratorView, ToastView } from "../components/view";
import { quizDatabase } from "../utils/storage";
import { validateQuizJson } from "../utils/validation";
import { EVENTS } from "../types";
import { events } from "../utils/events";

const generator = document.querySelector<HTMLElement>(".generator");
const toastContainer = document.querySelector<HTMLElement>("#error-toast");

if (!generator || !toastContainer) {
	throw new Error("MainPage: required elements not found.");
}

const generatorView = new QuizGeneratorView(generator, { events });
const toastView = new ToastView(toastContainer, { events });

events.on(EVENTS.QUIZ_FORM_SUBMIT, async ({ value }) => {
	const result = validateQuizJson(value);

	if (!result.isValid) {
		toastView.render({
			title: "Ошибка: не удалось обработать JSON.",
			message: "Проверьте формат данных и попробуйте снова.",
			isVisible: true
		});
		generatorView.render({ isValid: false });
		return;
	}

	await quizDatabase.saveQuiz(result.data);
	window.location.href = "./quizzes.html";
});

events.on(EVENTS.TOAST_ACTION, () => {
	toastView.render({ isVisible: false });
	generatorView.render({ isValid: true });
});
