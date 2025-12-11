import { QuizCardView, QuizzesView } from "../components/view";
import { quizDatabase } from "../utils/storage";
import { events } from "../utils/events";
import { EVENTS } from "../types";

const quizzesSection = document.querySelector<HTMLElement>(".quizzes");
const cardTemplate = document.querySelector<HTMLTemplateElement>("#quiz-card-template");

if (!quizzesSection || !cardTemplate) {
	throw new Error("QuizzesPage: required elements not found");
}

const quizzes = await quizDatabase.getAllQuizzes();

const quizzesView = new QuizzesView(quizzesSection, { events });

const cards = quizzes.map((quiz) => {
	const cardElement = cardTemplate.content.firstElementChild?.cloneNode(true) as HTMLElement | null;
	if (!cardElement) {
		throw new Error("Clone template error");
	}
	const card = new QuizCardView(cardElement, { events });
	return card.render(quiz);
});

quizzesView.render({ cards });

events.on(EVENTS.QUIZ_START, ({ id }) => {
	window.location.href = `./quiz.html?id=${id}`;
});
