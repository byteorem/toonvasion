import ky from "ky";
import mockData from "../../../invasions_response.json";

import type { Cog, CogType } from "@/types";
import { findCogByName } from "@/lib/cog-mapper";

// Types based on the TTR API response structure
export interface Invasion {
	asOf: number;
	type: string;
	progress: string;
	startTimestamp: number;
}

export interface InvasionsResponse {
	error: string | null;
	invasions: Record<string, Invasion>;
	lastUpdated: number;
}

// Enriched types with cog metadata
export interface EnrichedInvasion extends Invasion {
	district: string;
	cogType?: CogType;
	cogImage?: string;
	cogName: string;
}

export interface EnrichedInvasionsResponse {
	error: string | null;
	invasions: EnrichedInvasion[];
	lastUpdated: number;
}

/**
 * Enriches invasion data with cog metadata (type and image)
 * Converts the invasions object to an array with district names included
 */
export function enrichInvasionData(response: InvasionsResponse): EnrichedInvasionsResponse {
	const enrichedInvasions: EnrichedInvasion[] = Object.entries(response.invasions).map(
		([district, invasion]) => {
			const cog = findCogByName(invasion.type);
			return {
				...invasion,
				district,
				cogName: invasion.type,
				cogType: cog?.type,
				cogImage: cog?.image,
			};
		},
	);

	return {
		error: response.error,
		invasions: enrichedInvasions,
		lastUpdated: response.lastUpdated,
	};
}

/**
 * Creates a TTR API client with typed methods
 */
export function createTTRClient() {
	const api = ky.create({
		prefixUrl: "https://www.toontownrewritten.com/api",
	});

	return {
		/**
		 * Fetches current invasions from the Toontown Rewritten API
		 */
		getInvasions: async (): Promise<InvasionsResponse> => {
			return await api.get("invasions").json<InvasionsResponse>();
		},

		/**
		 * Returns mock invasion data from the JSON file
		 */
		getMockInvasions: async (): Promise<InvasionsResponse> => {
			return mockData as InvasionsResponse;
		},
	};
}
