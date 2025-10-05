"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import type {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
} from "@tanstack/react-table";
import {
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { InvasionCard } from "./InvasionCard";
import { DataTableToolbar } from "./data-table-toolbar";
import type { InvasionData } from "./invasions-columns";

interface InvasionsDataTableProps {
	columns: ColumnDef<InvasionData>[];
	data: InvasionData[];
}

const COG_TYPES = [
	{ value: "sellbot", label: "Sellbot" },
	{ value: "cashbot", label: "Cashbot" },
	{ value: "lawbot", label: "Lawbot" },
	{ value: "bossbot", label: "Bossbot" },
] as const;

export function InvasionsDataTable({ columns, data }: InvasionsDataTableProps) {
	const [parent] = useAutoAnimate();
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
		{
			id: "cogType",
			value: COG_TYPES.map((t) => t.value),
		},
	]);
	const [sorting, setSorting] = React.useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		state: {
			columnFilters,
			sorting,
		},
		onColumnFiltersChange: setColumnFilters,
		onSortingChange: setSorting,
	});

	// Calculate invasion counts per cog type
	const cogTypeCounts = React.useMemo(() => {
		const counts: Record<string, number> = {};
		for (const cogType of COG_TYPES) {
			counts[cogType.value] = data.filter(
				(invasion) => invasion.cogType === cogType.value,
			).length;
		}
		return counts;
	}, [data]);

	return (
		<div className="w-full space-y-4">
			{/* Toolbar with Filter and Sort Controls */}
			<DataTableToolbar
				table={table}
				cogTypeCounts={cogTypeCounts}
				COG_TYPES={COG_TYPES}
			/>

			{/* Card Grid Display */}
			<div
				ref={parent}
				className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
			>
				{table.getRowModel().rows.length ? (
					table.getRowModel().rows.map((row) => {
						const invasion = row.original;
						return (
							<InvasionCard
								key={invasion.district}
								title={invasion.cogName}
								location={invasion.district}
								remainingSeconds={invasion.remainingSeconds}
								progress={invasion.progressPercent}
								cogImage={invasion.cogImage}
							/>
						);
					})
				) : (
					<div className="col-span-full flex flex-col items-center justify-center gap-2 rounded-lg border bg-muted/50 p-8">
						<h3 className="font-semibold text-foreground text-lg">
							No invasions found
						</h3>
						<p className="text-muted-foreground">Try adjusting your filters</p>
					</div>
				)}
			</div>
		</div>
	);
}
