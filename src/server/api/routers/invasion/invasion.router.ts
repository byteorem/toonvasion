import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import * as Handler from "./invasion.handler";
import * as Schema from "./invasion.schema";

export const invasionRouter = createTRPCRouter({
	get: publicProcedure
		.input(Schema.getInvasionsInput)
		.query(Handler.getInvasions),
});
