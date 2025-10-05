import type { PublicHandler } from "@/server/api/trpc";
import { enrichInvasionData } from "@/server/clients/ttr_client";
import type * as Schema from "./invasion.schema";

export async function getInvasions({
	ctx,
}: PublicHandler<Schema.GetInvasionsInput>): Promise<Schema.GetInvasionsOutput> {
	//const response = await ctx.ttrClient.getInvasions();
	const response = await ctx.ttrClient.getMockInvasions();
	const enriched = enrichInvasionData(response);
	return enriched.invasions;
}
