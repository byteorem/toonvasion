import { InvasionCard } from "@/app/_components/InvasionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { HydrateClient } from "@/trpc/server";
import { Clock, Github, MapPin, Users } from "lucide-react";

// Mock invasion data
const mockInvasions = [
	{
		id: 1,
		district: "Daisy Gardens",
		invasionType: "Cog Invasion",
		cogType: "Lawbots",
		progress: 85,
		timeRemaining: "12m 34s",
		status: "ongoing",
		playersActive: 15,
	},
	{
		id: 2,
		district: "Donald's Dock",
		invasionType: "Skelecog Invasion",
		cogType: "Sellbots",
		progress: 45,
		timeRemaining: "23m 18s",
		status: "ongoing",
		playersActive: 8,
	},
	{
		id: 3,
		district: "Minnie's Melodyland",
		invasionType: "Cog Invasion",
		cogType: "Cashbots",
		progress: 100,
		timeRemaining: "Completed",
		status: "completed",
		playersActive: 0,
	},
	{
		id: 4,
		district: "The Brrrgh",
		invasionType: "Cog Invasion",
		cogType: "Bossbots",
		progress: 15,
		timeRemaining: "35m 42s",
		status: "ongoing",
		playersActive: 22,
	},
	{
		id: 5,
		district: "Toontown Central",
		invasionType: "Skelecog Invasion",
		cogType: "Lawbots",
		progress: 0,
		timeRemaining: "Starting soon",
		status: "upcoming",
		playersActive: 3,
	},
	{
		id: 6,
		district: "Donald's Dreamland",
		invasionType: "Cog Invasion",
		cogType: "Sellbots",
		progress: 92,
		timeRemaining: "5m 12s",
		status: "ongoing",
		playersActive: 18,
	},
];

export default async function Home() {
	return (
		<HydrateClient>
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
				{/* Header */}
				<header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
					<div className="container mx-auto flex h-16 items-center justify-between px-4">
						<div className="flex items-center gap-2">
							<MapPin className="h-6 w-6 text-primary" />
							<h1 className="font-bold text-primary text-xl">Toonvasion</h1>
						</div>
						<Button variant="outline" size="sm" asChild>
							<a
								href="https://github.com"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2"
							>
								<Github className="h-4 w-4" />
								GitHub
							</a>
						</Button>
					</div>
				</header>

				{/* Main Content */}
				<main className="container mx-auto px-4 py-8">
					<div className="mb-8 text-center">
						<h2 className="mb-2 font-bold text-3xl">Current Invasions</h2>
						<p className="text-muted-foreground">
							Track ongoing Cog invasions across Toontown districts
						</p>
					</div>

					{/* Invasions Grid */}
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{mockInvasions.map((invasion) => (
							<InvasionCard
								key={invasion.id}
								title={invasion.cogType}
								location={invasion.district}
								timeRemaining={invasion.timeRemaining}
								progress={invasion.progress}
							/>
						))}
					</div>
				</main>
			</div>
		</HydrateClient>
	);
}
