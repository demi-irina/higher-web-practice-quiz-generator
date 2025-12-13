import { QuizCardView, QuizzesView, HeaderView } from "../components/view";
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

const quizzes = await quizDatabase.getAllQuizzes();

new HeaderView(header);
const quizzesView = new QuizzesView(quizzesSection, { events });

const cards = quizzes.map((quiz) => {
	const cardElement = cloneTemplateContent(cardTemplate);
	const card = new QuizCardView(cardElement, { events });
	return card.render(quiz);
});

quizzesView.render({ cards });

events.on(EVENTS.QUIZ_START, ({ id }) => {
	window.location.href = `./quiz.html?id=${id}`;
});
