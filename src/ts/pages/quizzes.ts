import { HeaderView, QuizCardView, QuizzesView } from "../components/view";
import { QuizzesModel } from "../components/model";
import { quizDatabase } from "../utils/storage";
import { events } from "../utils/events";
import { EVENTS } from "../types";
import { cloneTemplateContent } from "../utils/dom";

const header = document.querySelector<HTMLElement>(".header");
const quizzesSection = document.querySelector<HTMLElement>(".quizzes");
const cardTemplate = document.querySelector<HTMLTemplateElement>("#quiz-card-template");

if (!header || !quizzesSection || !cardTemplate) {
	throw new Error("QuizzesPage: required elements not found");
}

new HeaderView(header);
const quizzesView = new QuizzesView(quizzesSection, { events });
const quizzesModel = new QuizzesModel(quizDatabase, events);

events.on(EVENTS.QUIZZES_LOAD_SUCCESS, ({ quizzes }) => {
	const cards = quizzes.map((quiz) => {
		const cardElement = cloneTemplateContent(cardTemplate);
		const card = new QuizCardView(cardElement, { events });
		return card.render(quiz);
	});
	quizzesView.render({ cards });
});

events.on(EVENTS.QUIZZES_LOAD_FAILED, () => {
	quizzesView.render({ cards: [] });
});

events.on(EVENTS.QUIZ_START, ({ id }) => {
	window.location.href = `./quiz.html?id=${id}`;
});

void quizzesModel.loadQuizzes();
