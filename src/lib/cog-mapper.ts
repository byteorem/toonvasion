import type { Cog } from "@/types";
import { COGS } from "./constants";

/**
 * Normalizes a cog name for comparison by removing spaces and converting to lowercase
 */
function normalizeCogName(name: string): string {
	return name.replace(/\s+/g, "").toLowerCase();
}

/**
 * Finds a cog in the COGS array by name, handling different formatting
 * @param name - The cog name from the API (e.g., "Back Stabber", "Corporate Raider")
 * @returns The matching Cog object or undefined if not found
 */
export function findCogByName(name: string): Cog | undefined {
	const normalizedSearchName = normalizeCogName(name);
	return COGS.find((cog) => normalizeCogName(cog.name) === normalizedSearchName);
}

/**
 * Gets the cog type category (bossbot, cashbot, lawbot, sellbot) for a given cog name
 * @param name - The cog name from the API
 * @returns The cog type or undefined if not found
 */
export function getCogType(name: string): Cog["type"] | undefined {
	return findCogByName(name)?.type;
}

/**
 * Gets the cog image path for a given cog name
 * @param name - The cog name from the API
 * @returns The image path or undefined if not found
 */
export function getCogImage(name: string): string | undefined {
	return findCogByName(name)?.image;
}
