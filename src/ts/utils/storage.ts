import { type IDBPDatabase, openDB, type StoreNames } from "idb";
import { nanoid } from "nanoid";
import type { QuizData, QuizDB } from "../types";

class QuizDatabase {
	private readonly storeName: StoreNames<QuizDB>;
	private readonly dbPromise: Promise<IDBPDatabase<QuizDB>>;

	constructor() {
		this.storeName = "quizzes";
		const storeName = this.storeName;
		this.dbPromise = openDB<QuizDB>("quizzes-db", 1, {
			upgrade(db) {
				if (!db.objectStoreNames.contains(storeName)) {
					db.createObjectStore(storeName, { keyPath: "id" });
				}
			}
		});
	}

	async saveQuiz(quizData: QuizData) {
		const db = await this.dbPromise;
		return db.put(this.storeName, { id: nanoid(), ...quizData });
	}

	async getQuiz(id: string) {
		const db = await this.dbPromise;
		return db.get(this.storeName, id);
	}

	async getAllQuizzes() {
		const db = await this.dbPromise;
		return db.getAll(this.storeName);
	}

	async deleteQuiz(id: string) {
		const db = await this.dbPromise;
		return db.delete(this.storeName, id);
	}

	async clearAllQuizzes() {
		const db = await this.dbPromise;
		return db.clear(this.storeName);
	}
}

export const quizDatabase = new QuizDatabase();
