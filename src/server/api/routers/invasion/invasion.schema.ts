import { z } from "zod";
import type { CogType } from "@/types";

export const getInvasionsInput = z.undefined();

export type GetInvasionsInput = z.infer<typeof getInvasionsInput>;
export type GetInvasionsOutput = Array<{
	district: string;
	asOf: number;
	type: string;
	progress: string;
	startTimestamp: number;
	cogName: string;
	cogType?: CogType;
	cogImage?: string;
}>;
