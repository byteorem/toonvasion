"use client";

import { api } from "@/trpc/react";
import { InvasionsDataTable } from "./InvasionsDataTable";
import { columns } from "./invasions-columns";

export default function InvasionsContainer() {
	const {
		data: invasions,
		isLoading,
		isError,
		error,
	} = api.invasion.get.useQuery();

	if (isLoading) {
		const skeletonIds = ["1", "2", "3", "4", "5", "6"];
		return (
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{skeletonIds.map((id) => (
					<div
						key={id}
						className="h-64 w-full max-w-md animate-pulse rounded-lg bg-white/50"
					/>
				))}
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-8">
				<h3 className="font-semibold text-lg text-red-900">
					Failed to load invasions
				</h3>
				<p className="text-red-700">
					{error?.message ?? "An unknown error occurred"}
				</p>
			</div>
		);
	}

	if (!invasions || invasions.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-8">
				<h3 className="font-semibold text-gray-900 text-lg">
					No active invasions
				</h3>
				<p className="text-gray-600">Check back later for new invasions</p>
			</div>
		);
	}

	// Process invasions data for the table
	const processedData = invasions
		.map((invasion) => {
			// TTR invasions typically last 30-45 minutes, using 45 minutes as estimate
			const invasionDuration = 45 * 60; // 45 minutes in seconds
			const elapsedSeconds = invasion.asOf - invasion.startTimestamp;
			const remainingSeconds = Math.max(0, invasionDuration - elapsedSeconds);

			// Calculate time-based progress (100-0% based on remaining time)
			const progressPercent = Math.round(
				(remainingSeconds / invasionDuration) * 100,
			);

			return {
				district: invasion.district,
				cogName: invasion.cogName,
				cogType: invasion.cogType ?? ("unknown" as const),
				cogImage: invasion.cogImage,
				remainingSeconds,
				progressPercent,
			};
		})
		.filter(({ remainingSeconds }) => remainingSeconds > 0);

	return <InvasionsDataTable columns={columns} data={processedData} />;
}
