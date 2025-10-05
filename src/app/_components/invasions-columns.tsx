"use client";

import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import type { CogType } from "@/types";

export type InvasionData = {
	district: string;
	cogName: string;
	cogType: CogType | "unknown";
	cogImage?: string;
	remainingSeconds: number;
	progressPercent: number;
};

export const columns: ColumnDef<InvasionData>[] = [
	{
		accessorKey: "cogType",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => {
						// Mock sorting - will be implemented later
						console.log("Sort by type clicked");
					}}
				>
					Invasion Type
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		filterFn: (row, columnId, filterValue) => {
			const selectedTypes = filterValue as string[];
			const cogType = row.getValue(columnId) as string;

			// Exact match check for cog type
			return selectedTypes.includes(cogType);
		},
	},
	{
		accessorKey: "district",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => {
						// Mock sorting - will be implemented later
						console.log("Sort by district clicked");
					}}
				>
					District
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "remainingSeconds",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => {
						// Mock sorting - will be implemented later
						console.log("Sort by remaining time clicked");
					}}
				>
					Time Remaining
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "progressPercent",
		header: "Progress",
	},
];
