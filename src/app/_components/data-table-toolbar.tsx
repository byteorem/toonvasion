"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Table } from "@tanstack/react-table";
import { ArrowUpDown, ListFilter } from "lucide-react";
import * as React from "react";
import type { InvasionData } from "./invasions-columns";

interface DataTableToolbarProps {
	table: Table<InvasionData>;
	cogTypeCounts: Record<string, number>;
	COG_TYPES: readonly { value: string; label: string }[];
}

export function DataTableToolbar({
	table,
	cogTypeCounts,
	COG_TYPES,
}: DataTableToolbarProps) {
	const columnFilters = table.getState().columnFilters;
	const selectedCogTypes =
		(columnFilters.find((f) => f.id === "cogType")?.value as string[]) ?? [];

	const toggleCogType = (cogType: string) => {
		const currentFilter = columnFilters.find((f) => f.id === "cogType");
		const currentValues = (currentFilter?.value as string[]) ?? [];

		const newValues = currentValues.includes(cogType)
			? currentValues.filter((type) => type !== cogType)
			: [...currentValues, cogType];

		table.setColumnFilters([
			{
				id: "cogType",
				value: newValues,
			},
		]);
	};

	const filterCount = selectedCogTypes.length;

	// Sorting state
	const sortingState = table.getState().sorting;
	const currentSort = sortingState.find((s) => s.id === "remainingSeconds");
	const sortDirection = currentSort?.desc ? "desc" : "asc";
	const isSorted = sortingState.length > 0;

	const handleSortChange = (value: string) => {
		if (value === "none") {
			table.setSorting([]);
		} else {
			table.setSorting([
				{
					id: "remainingSeconds",
					desc: value === "desc",
				},
			]);
		}
	};

	return (
		<div className="flex items-center gap-2">
			{/* Filter Button */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="gap-2"
						aria-label={`Filter by cog type. ${filterCount} of ${COG_TYPES.length} selected`}
					>
						<ListFilter className="h-4 w-4" />
						Cog Type
						{filterCount > 0 && filterCount < COG_TYPES.length && (
							<span className="ml-1 rounded-full bg-primary px-2 py-0.5 font-medium text-primary-foreground text-xs">
								{filterCount}
							</span>
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-64">
					<DropdownMenuLabel>Cog Types</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<div className="max-h-64 overflow-y-auto">
						{COG_TYPES.map((cogType) => {
							const count = cogTypeCounts[cogType.value] ?? 0;
							return (
								<DropdownMenuCheckboxItem
									key={cogType.value}
									checked={selectedCogTypes.includes(cogType.value)}
									onCheckedChange={() => toggleCogType(cogType.value)}
									className="gap-2"
								>
									<span className="flex-1">{cogType.label}</span>
									<span className="text-muted-foreground text-xs">{count}</span>
								</DropdownMenuCheckboxItem>
							);
						})}
					</div>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* Sort Button */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="gap-2"
						aria-label="Sort by time remaining"
					>
						<ArrowUpDown className="h-4 w-4" />
						Sort
						{isSorted && (
							<span className="ml-1 rounded-full bg-primary px-2 py-0.5 font-medium text-primary-foreground text-xs">
								1
							</span>
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuLabel>Sort by Time Remaining</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup
						value={isSorted ? sortDirection : "none"}
						onValueChange={handleSortChange}
					>
						<DropdownMenuRadioItem value="none">None</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="asc">
							Shortest first
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="desc">
							Longest first
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
