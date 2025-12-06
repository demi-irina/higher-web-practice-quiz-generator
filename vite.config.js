import { resolve } from "path";
import { defineConfig } from "vite";

const srcDir = resolve(__dirname, "src");

export default defineConfig({
	root: srcDir,
	base: "./",
	server: {
		port: 5173,
		open: true
	},
	build: {
		outDir: resolve(__dirname, "dist"),
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: resolve(srcDir, "index.html"),
				quizzes: resolve(srcDir, "quizzes.html"),
				quiz: resolve(srcDir, "quiz.html")
			}
		}
	},
	optimizeDeps: {
		include: ["zod", "idb", "nanoid"]
	}
});
