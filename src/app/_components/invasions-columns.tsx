"use client";

import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type InvasionData = {
	district: string;
	type: string;
	remainingSeconds: number;
	progressPercent: number;
};

export const columns: ColumnDef<InvasionData>[] = [
	{
		accessorKey: "type",
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
			const selectedTypes = filterValue as Set<string>;
			const invasionType = row.getValue(columnId) as string;

			// Check if the invasion type contains any of the selected cog types
			return Array.from(selectedTypes).some((cogType) =>
				invasionType.includes(cogType),
			);
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