import Countdown from "@/components/countdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
	remainingSeconds: number;
	progress: number;
	cogImage?: string;
}

export function InvasionCard({
	title,
	location,
	remainingSeconds,
	progress,
	cogImage,
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
						<AvatarImage src={cogImage} />
						<AvatarFallback className="bg-gray-400" />
					</Avatar>
				</CardAction>
			</CardHeader>
			<CardContent>
				<div className="flex items-center gap-2">
					<Countdown seconds={remainingSeconds} />
					<span className="font-medium text-black text-xl">remaining</span>
				</div>
			</CardContent>
			<CardFooter>
				<Progress value={progress} className="h-3 w-full" />
			</CardFooter>
		</Card>
	);
}
