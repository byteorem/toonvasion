import type { PublicHandler } from "@/server/api/trpc";
import type * as Schema from "./invasion.schema";

export async function getInvasions({
	ctx,
}: PublicHandler<Schema.GetInvasionsInput>): Promise<Schema.GetInvasionsOutput> {
	//const response = await ctx.ttrClient.getInvasions();
	const response = await ctx.ttrClient.getMockInvasions();
	return Object.entries(response.invasions).map(([district, invasion]) => ({
		district,
		...invasion,
	}));
}
