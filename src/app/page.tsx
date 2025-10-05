import InvasionsContainer from "@/app/_components/Invasions";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { HydrateClient } from "@/trpc/server";
import { Github, MapPin } from "lucide-react";

export default async function Home() {
	return (
		<HydrateClient>
			<div className="min-h-screen ">
				{/* Header */}
				<header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
					<div className="container mx-auto flex h-16 items-center justify-between px-4">
						<div className="flex items-center gap-2">
							<MapPin className="h-6 w-6 text-primary" />
							<h1 className="font-bold text-primary text-xl">Toonvasion</h1>
						</div>
						<div className="flex items-center gap-2">
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
							<ThemeToggle />
						</div>
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
					<InvasionsContainer />
				</main>
			</div>
		</HydrateClient>
	);
}
