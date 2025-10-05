import type { Cog } from "@/types";
import { distance } from "fastest-levenshtein";
import { P, match } from "ts-pattern";
import { COGS } from "./constants";

/**
 * Normalizes a cog name for comparison by removing spaces and converting to lowercase
 */
function normalizeCogName(name: string): string {
	return name.replace(/\s+/g, "").toLowerCase();
}

/**
 * Map for O(1) cog lookups by normalized name
 */
const cogLookupMap = new Map<string, Cog>(
	COGS.map((cog) => [normalizeCogName(cog.name), cog]),
);

/**
 * Default fallback cog (Flunky) for when no match is found
 */
const DEFAULT_COG: Cog = (() => {
	const flunky = COGS.find((cog) => cog.name === "Flunky");
	if (!flunky) {
		throw new Error(
			"Flunky cog not found in COGS array - data misconfiguration",
		);
	}
	return flunky;
})();

/**
 * Maximum Levenshtein distance threshold for fuzzy matching
 * Names with distance > threshold are considered too different
 */
const FUZZY_MATCH_THRESHOLD = 3;

/**
 * Finds the best matching cog using fuzzy matching
 * @param normalizedName - The normalized cog name to search for
 * @returns The best matching Cog or undefined if none within threshold
 */
function findFuzzyMatch(normalizedName: string): Cog | undefined {
	let bestMatch: Cog | undefined;
	let bestDistance = Number.POSITIVE_INFINITY;

	for (const [cogNormalizedName, cog] of cogLookupMap) {
		const dist = distance(normalizedName, cogNormalizedName);
		if (dist < bestDistance && dist <= FUZZY_MATCH_THRESHOLD) {
			bestDistance = dist;
			bestMatch = cog;
		}
	}

	return bestMatch;
}

/**
 * Finds a cog by name using pattern matching with exact and fuzzy matching fallback
 * @param name - The cog name from the API (e.g., "Back Stabber", "Corporate Raider")
 * @returns The matching Cog object, defaults to Flunky if no match found
 */
export function findCogByName(name: string): Cog {
	const normalizedName = normalizeCogName(name);

	return match(normalizedName)
		.with(P.string.minLength(1), (normalized) => {
			// Try exact match first
			const exactMatch = cogLookupMap.get(normalized);
			if (exactMatch) return exactMatch;

			// Try fuzzy match
			const fuzzyMatch = findFuzzyMatch(normalized);
			if (fuzzyMatch) return fuzzyMatch;

			// Default to Flunky
			return DEFAULT_COG;
		})
		.otherwise(() => DEFAULT_COG);
}

/**
 * Gets the cog type category (bossbot, cashbot, lawbot, sellbot) for a given cog name
 * @param name - The cog name from the API
 * @returns The cog type (defaults to Flunky's type if no match found)
 */
export function getCogType(name: string): Cog["type"] {
	return findCogByName(name).type;
}

/**
 * Gets the cog image path for a given cog name
 * @param name - The cog name from the API
 * @returns The image path (defaults to Flunky's image if no match found)
 */
export function getCogImage(name: string): string {
	return findCogByName(name).image;
}
