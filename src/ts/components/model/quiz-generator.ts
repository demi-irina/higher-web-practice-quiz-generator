import { Model } from "../base";
import type { EventsMap, IEvents, IQuizDatabase } from "../../types";
import { EVENTS } from "../../types";
import { validateQuizJson } from "../../utils/validation";

export class QuizGeneratorModel extends Model {
	private db: IQuizDatabase;

	constructor(db: IQuizDatabase, events: IEvents<EventsMap>) {
		super(events);
		this.db = db;
	}

	async submitQuiz(jsonString: string): Promise<boolean> {
		const result = validateQuizJson(jsonString);

		if (!result.isValid) {
			this.emitChanges(EVENTS.QUIZ_VALIDATION_FAILED);
			return false;
		}

		try {
			await this.db.saveQuiz(result.data);
			this.emitChanges(EVENTS.QUIZ_SAVE_SUCCESS);
			return true;
		} catch (error) {
			this.emitChanges(EVENTS.QUIZ_SAVE_FAILED);
			return false;
		}
	}
}
