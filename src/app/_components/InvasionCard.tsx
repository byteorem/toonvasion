import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type * as React from "react";

interface InvasionCardProps {
	title: string;
	location: string;
	timeRemaining: string;
	progress: number;
}

export function InvasionCard({
	title,
	location,
	timeRemaining,
	progress,
}: InvasionCardProps) {
	return (
		<Card className="w-full max-w-md bg-white">
			<CardHeader>
				<CardTitle className="font-black text-3xl text-black uppercase tracking-tight">
					{title}
				</CardTitle>
				<CardDescription className="font-normal text-black text-xl">
					{location}
				</CardDescription>
				<CardAction>
					<Avatar className="h-20 w-20">
						<AvatarFallback className="bg-gray-400" />
					</Avatar>
				</CardAction>
			</CardHeader>
			<CardContent>
				<p className="font-medium text-black text-xl">
					{timeRemaining} remaining
				</p>
			</CardContent>
			<CardFooter>
				<Progress value={progress} className="h-3 w-full" />
			</CardFooter>
		</Card>
	);
}
