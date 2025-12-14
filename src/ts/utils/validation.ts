import { z } from "zod";

type ValidationResult<T> = { isValid: false; error: string } | { isValid: true; data: T };

export function validateJson<S extends z.ZodType>(jsonString: string, schema: S): ValidationResult<z.infer<S>> {
	let parsed: unknown;

	try {
		parsed = JSON.parse(jsonString);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		return { isValid: false, error: message };
	}

	const result = schema.safeParse(parsed);

	if (!result.success) {
		return { isValid: false, error: result.error.message };
	}

	return { isValid: true, data: result.data };
}
