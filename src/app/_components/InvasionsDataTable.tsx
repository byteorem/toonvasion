"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import {
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { CirclePlus } from "lucide-react";
import { InvasionCard } from "./InvasionCard";
import type { InvasionData } from "./invasions-columns";

interface InvasionsDataTableProps {
	columns: ColumnDef<InvasionData>[];
	data: InvasionData[];
}

const COG_TYPES = ["Sellbot", "Cashbot", "Lawbot", "Bossbot"] as const;

export function InvasionsDataTable({
	columns,
	data,
}: InvasionsDataTableProps) {
	const [parent] = useAutoAnimate();
	const [selectedCogTypes, setSelectedCogTypes] = React.useState<Set<string>>(
		new Set(COG_TYPES),
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters: [
				{
					id: "type",
					value: selectedCogTypes,
				},
			],
		},
	});

	const toggleCogType = (cogType: string) => {
		setSelectedCogTypes((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(cogType)) {
				newSet.delete(cogType);
			} else {
				newSet.add(cogType);
			}
			return newSet;
		});
	};

	return (
		<div className="w-full space-y-4">
			{/* Filter Controls */}
			<div className="flex items-center gap-2">
				<Input
					placeholder="Filter invasions..."
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						// Mock filtering - will be implemented later
						console.log("Filter value:", event.target.value);
					}}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="gap-2">
							<CirclePlus className="h-4 w-4" />
							Cog Type
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						<DropdownMenuLabel>Filter by Cog Type</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{COG_TYPES.map((cogType) => (
							<DropdownMenuCheckboxItem
								key={cogType}
								checked={selectedCogTypes.has(cogType)}
								onCheckedChange={() => toggleCogType(cogType)}
							>
								{cogType}
							</DropdownMenuCheckboxItem>
						))}
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
								title={invasion.type}
								location={invasion.district}
								remainingSeconds={invasion.remainingSeconds}
								progress={invasion.progressPercent}
							/>
						);
					})
				) : (
					<div className="col-span-full flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-8">
						<h3 className="font-semibold text-gray-900 text-lg">
							No invasions found
						</h3>
						<p className="text-gray-600">Try adjusting your filters</p>
					</div>
				)}
			</div>
		</div>
	);
}