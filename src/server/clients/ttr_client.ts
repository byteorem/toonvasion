import ky from "ky";
import mockData from "../../../invasions_response.json";

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
