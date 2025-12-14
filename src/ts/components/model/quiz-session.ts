import { Model } from "../base";
import type { EventsMap, IEvents, IQuizDatabase, QuizAnswerResult, QuizRecord } from "../../types";
import { EVENTS, type QuizQuestion } from "../../types";

export class QuizSessionModel extends Model {
	private db: IQuizDatabase;
	private quiz: QuizRecord | null;
	private currentIndex: number;
	private correctCount: number;
	private completed: boolean;

	constructor(db: IQuizDatabase, events: IEvents<EventsMap>) {
		super(events);
		this.db = db;
		this.quiz = null;
		this.currentIndex = 0;
		this.correctCount = 0;
		this.completed = false;
	}

	async start(quizId: string): Promise<void> {
		try {
			const quiz = await this.db.getQuiz(quizId);
			if (!quiz) {
				this.emitChanges(EVENTS.QUIZ_LOAD_FAILED);
				return;
			}
			this.quiz = quiz;
		} catch (error) {
			this.emitChanges(EVENTS.QUIZ_LOAD_FAILED);
			return;
		}

		const { title, description, questions } = this.quiz;
		this.emitChanges(EVENTS.QUIZ_SESSION_STARTED, { title, description, total: questions.length });

		this.emitSessionUpdated();
	}

	submitAnswer(answer: string[]): QuizAnswerResult | null {
		if (this.completed || !this.quiz) return null;

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
		if (this.completed || !this.quiz) return;

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

	private finish(): void {
		if (!this.quiz) return;

		this.completed = true;
		this.emitChanges(EVENTS.QUIZ_SESSION_FINISHED, {
			correctCount: this.correctCount,
			total: this.quiz.questions.length
		});
	}

	private emitSessionUpdated(): void {
		if (!this.quiz) return;

		const question = this.quiz.questions[this.currentIndex];
		if (!question) return;

		this.emitChanges(EVENTS.QUIZ_SESSION_UPDATED, {
			question,
			currentIndex: this.currentIndex,
			total: this.quiz.questions.length
		});
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
}
