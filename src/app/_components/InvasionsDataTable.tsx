"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
import {
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ListFilter } from "lucide-react";
import { InvasionCard } from "./InvasionCard";
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

export function InvasionsDataTable({
	columns,
	data,
}: InvasionsDataTableProps) {
	const [parent] = useAutoAnimate();
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[
			{
				id: "cogType",
				value: COG_TYPES.map((t) => t.value),
			},
		],
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters,
		},
		onColumnFiltersChange: setColumnFilters,
	});

	const toggleCogType = (cogType: string) => {
		const currentFilter = columnFilters.find((f) => f.id === "cogType");
		const currentValues = (currentFilter?.value as string[]) ?? [];

		const newValues = currentValues.includes(cogType)
			? currentValues.filter((type) => type !== cogType)
			: [...currentValues, cogType];

		setColumnFilters([
			{
				id: "cogType",
				value: newValues,
			},
		]);
	};

	const selectedCogTypes =
		(columnFilters.find((f) => f.id === "cogType")?.value as string[]) ?? [];

	// Calculate invasion counts per cog type
	const cogTypeCounts = React.useMemo(() => {
		const counts: Record<string, number> = {};
		for (const cogType of COG_TYPES) {
			counts[cogType.value] = data.filter((invasion) => invasion.cogType === cogType.value).length;
		}
		return counts;
	}, [data]);

	const filterCount = selectedCogTypes.length;
	const allSelected = filterCount === COG_TYPES.length;

	return (
		<div className="w-full space-y-4">
			{/* Filter Controls */}
			<div className="flex items-center gap-2">
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
			</div>

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