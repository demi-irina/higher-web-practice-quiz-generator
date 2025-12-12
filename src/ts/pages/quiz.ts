import {
	ModalView,
	OptionView,
	QuestionView,
	QuizContentView,
	QuizHeadView,
	QuizProgressView,
	QuizSectionView
} from "../components/view";
import { QuizSessionModel } from "../components/model";
import { quizDatabase } from "../utils/storage";
import { events } from "../utils/events";
import type { QuizAnswerResult, QuizQuestion } from "../types";
import { EVENTS } from "../types";
import { cloneTemplateContent } from "../utils/dom";

function getQuizIdFromUrl(): string | null {
	const params = new URLSearchParams(window.location.search);
	return params.get("id");
}

function setQuestionNumToUrl(index: number) {
	const params = new URLSearchParams(window.location.search);
	params.set("q", String(index + 1));
	const newUrl = `${window.location.pathname}?${params.toString()}`;
	window.history.replaceState({}, "", newUrl);
}

function removeQuestionNumFromUrl() {
	const params = new URLSearchParams(window.location.search);
	params.delete("q");
	const newUrl = `${window.location.pathname}?${params.toString()}`;
	window.history.replaceState({}, "", newUrl);
}

function renderQuestion(question: QuizQuestion, answer?: string[], result?: QuizAnswerResult, isLast?: boolean) {
	const questionTemplate = question.type === "single" ? singleQuestionTemplate : multipleQuestionTemplate;
	const optionTemplate = question.type === "single" ? radioOptionTemplate : checkboxOptionTemplate;

	if (!optionTemplate || !questionTemplate) {
		throw new Error("Template not found");
	}

	const hasResult = Boolean(result);

	const optionViews = question.options.map((option) => {
		const optionView = new OptionView(cloneTemplateContent(optionTemplate), { events });

		const resultData = result?.texts.find((r) => r.id === option.id);
		const isChecked = answer?.includes(String(option.id)) ?? false;

		optionView.render({
			option,
			disabled: hasResult,
			checked: isChecked,
			result: resultData ? { text: resultData.message, isSuccess: resultData.isSuccess } : undefined
		});

		return optionView;
	});

	const optionElements = optionViews.map((v) => v.element);
	const questionView = new QuestionView(cloneTemplateContent(questionTemplate), { events });
	const questionElement = questionView.render({ optionElements, text: question.text });

	quizContentView.render({
		questionElement,
		questionType: question.type,
		showSubmit: !hasResult,
		showNext: hasResult,
		nextLabel: hasResult ? (isLast ? "Завершить тест" : "Следующий вопрос") : undefined
	});
}

const quizSection = document.querySelector<HTMLElement>(".quiz");
const quizHead = quizSection?.querySelector<HTMLElement>(".quiz__head");
const quizProgress = quizSection?.querySelector<HTMLElement>(".quiz__progress");
const quizContent = quizSection?.querySelector<HTMLElement>(".quiz__content");
const resultModal = document.querySelector<HTMLElement>("#result-modal");
const singleQuestionTemplate = document.querySelector<HTMLTemplateElement>("#single-question-template");
const multipleQuestionTemplate = document.querySelector<HTMLTemplateElement>("#multiple-question-template");
const radioOptionTemplate = document.querySelector<HTMLTemplateElement>("#option-template");
const checkboxOptionTemplate = document.querySelector<HTMLTemplateElement>("#checkbox-option-template");

if (
	!quizSection ||
	!quizHead ||
	!quizProgress ||
	!quizContent ||
	!resultModal ||
	!singleQuestionTemplate ||
	!multipleQuestionTemplate ||
	!radioOptionTemplate ||
	!checkboxOptionTemplate
) {
	throw new Error("QuizPage: required elements not found");
}

const quizId = getQuizIdFromUrl();
if (!quizId) {
	window.location.href = "./quizzes.html";
	throw new Error("Quiz ID not found");
}

const quiz = await quizDatabase.getQuiz(quizId);
if (!quiz) {
	throw new Error("Quiz not found");
}

const quizSectionView = new QuizSectionView(quizSection, { events });
const quizHeadView = new QuizHeadView(quizHead, { events });
const quizProgressView = new QuizProgressView(quizProgress, { events });
const quizContentView = new QuizContentView(quizContent, { events });
const modalView = new ModalView(resultModal, { events });
const session = new QuizSessionModel(quiz, events);

events.on(EVENTS.QUIZ_SESSION_STARTED, ({ title, description, total }) => {
	quizHeadView.render({ title, description });
	quizProgressView.render({ currentIndex: 0, total });
});

events.on(EVENTS.QUIZ_SESSION_UPDATED, ({ question, currentIndex, total }) => {
	quizProgressView.render({ currentIndex, total });
	renderQuestion(question);
	setQuestionNumToUrl(currentIndex);
});

events.on(EVENTS.QUIZ_ANSWER_RESULT, ({ question, result, answer, isLast }) => {
	renderQuestion(question, answer, result, isLast);
});

events.on(EVENTS.QUIZ_SESSION_FINISHED, ({ correctCount, total }) => {
	quizSectionView.render({ isVisible: false });
	modalView.render({
		data: {
			title: "Тест завершен",
			subtitle: `Вы ответили правильно на ${correctCount} из ${total} вопросов`,
			message: `Отличная попытка`
		},
		isOpen: true
	});
	removeQuestionNumFromUrl();
});

events.on(EVENTS.QUIZ_ANSWER_SUBMIT, ({ answer }) => {
	session.submitAnswer(answer);
});

events.on(EVENTS.QUIZ_NEXT, () => {
	session.goNext();
});

events.on(EVENTS.QUIZ_RESTART, () => {
	quizSectionView.render({ isVisible: true });
	modalView.render({ isOpen: false });
	session.restart();
});

session.start();
