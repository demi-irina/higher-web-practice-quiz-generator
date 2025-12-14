import { Model } from "../base";
import type { EventsMap, IEvents, IQuizDatabase } from "../../types";
import { EVENTS } from "../../types";
import { validateJson } from "../../utils/validation";
import { QuizSchema } from "../../schema";

export class QuizGeneratorModel extends Model {
	private db: IQuizDatabase;

	constructor(db: IQuizDatabase, events: IEvents<EventsMap>) {
		super(events);
		this.db = db;
	}

	async submitQuiz(jsonString: string): Promise<boolean> {
		const result = validateJson(jsonString, QuizSchema);

		if (!result.isValid) {
			this.emitChanges(EVENTS.QUIZ_VALIDATION_FAILED, { error: result.error });
			return false;
		}

		try {
			await this.db.saveQuiz(result.data);
			this.emitChanges(EVENTS.QUIZ_SAVE_SUCCESS);
			return true;
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			this.emitChanges(EVENTS.QUIZ_SAVE_FAILED, { error: message });
			return false;
		}
	}
}
