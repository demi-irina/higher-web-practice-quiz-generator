import { Model } from "../base";
import type { IEvents, EventsMap, QuizAnswerResult, QuizRecord } from "../../types";
import { EVENTS, type QuizQuestion } from "../../types";

export class QuizSessionModel extends Model {
	private quiz: QuizRecord;
	private currentIndex: number;
	private correctCount: number;
	private completed: boolean;

	constructor(quiz: QuizRecord, events: IEvents<EventsMap>) {
		super(events);

		this.quiz = quiz;
		this.currentIndex = 0;
		this.correctCount = 0;
		this.completed = false;
	}

	start(): void {
		this.emitChanges(EVENTS.QUIZ_SESSION_STARTED, {
			title: this.quiz.title,
			description: this.quiz.description,
			total: this.quiz.questions.length
		});
		this.emitSessionUpdated();
	}

	submitAnswer(answer: string[]): QuizAnswerResult | null {
		if (this.completed) return null;

		const question = this.quiz.questions[this.currentIndex];
		if (!question) return null;

		const result = this.checkAnswer(question, answer);
		if (result.isCorrect) {
			this.correctCount += 1;
		}

		const isLast = this.currentIndex >= this.quiz.questions.length - 1;
		this.emitChanges(EVENTS.QUIZ_ANSWER_RESULT, { question, answer, result, isLast });

		return result;
	}

	goNext(): void {
		if (this.completed) return;

		const hasNext = this.currentIndex < this.quiz.questions.length - 1;
		if (hasNext) {
			this.currentIndex += 1;
			this.emitSessionUpdated();
			return;
		}

		this.finish();
	}

	restart(): void {
		this.currentIndex = 0;
		this.correctCount = 0;
		this.completed = false;
		this.emitSessionUpdated();
	}

	private checkAnswer(question: QuizQuestion, answer: string[]): QuizAnswerResult {
		const selectedIds = answer.map((value) => Number(value));

		const correctIds = question.options.filter((option) => option.correct).map((option) => option.id);
		const isCorrect =
			selectedIds.length === correctIds.length &&
			selectedIds.every((id) => correctIds.includes(id)) &&
			correctIds.every((id) => selectedIds.includes(id));

		const texts = question.options
			.filter((option) => option.correct || selectedIds.includes(option.id))
			.map((option) => ({
				id: option.id,
				message: option.message,
				isSuccess: option.correct
			}));

		return { isCorrect, texts };
	}

	private emitSessionUpdated(): void {
		const question = this.quiz.questions[this.currentIndex];
		if (!question) return;

		this.emitChanges(EVENTS.QUIZ_SESSION_UPDATED, {
			question,
			currentIndex: this.currentIndex,
			total: this.quiz.questions.length
		});
	}

	private finish(): void {
		this.completed = true;
		this.emitChanges(EVENTS.QUIZ_SESSION_FINISHED, {
			correctCount: this.correctCount,
			total: this.quiz.questions.length
		});
	}
}
