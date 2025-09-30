import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { useEffect } from "react";
import { useCountdown } from "usehooks-ts";

type Props = {
	seconds: number;
};

export default function Countdown({ seconds }: Props) {
	const [count, { startCountdown, resetCountdown }] = useCountdown({
		countStart: seconds,
		intervalMs: 1000,
		countStop: 0,
	});

	useEffect(() => {
		resetCountdown();
		startCountdown();
	}, [resetCountdown, startCountdown]);

	const hh = Math.floor(count / 3600);
	const mm = Math.floor((count % 3600) / 60);
	const ss = count % 60;

	return (
		<NumberFlowGroup>
			<div
				style={
					{
						fontVariantNumeric: "tabular-nums",
						"--number-flow-char-height": "0.85em",
					} as React.CSSProperties
				}
				className="flex items-baseline font-semibold text-3xl"
			>
				{hh > 0 && (
					<>
						<NumberFlow
							trend={-1}
							value={hh}
							format={{ minimumIntegerDigits: 2 }}
						/>
						<NumberFlow
							prefix=":"
							trend={-1}
							value={mm}
							digits={{ 1: { max: 5 } }}
							format={{ minimumIntegerDigits: 2 }}
						/>
					</>
				)}
				{hh === 0 && mm > 0 && (
					<NumberFlow
						trend={-1}
						value={mm}
						digits={{ 1: { max: 5 } }}
						format={{ minimumIntegerDigits: 2 }}
					/>
				)}
				<NumberFlow
					prefix={hh > 0 || mm > 0 ? ":" : ""}
					trend={-1}
					value={ss}
					digits={{ 1: { max: 5 } }}
					format={{ minimumIntegerDigits: 2 }}
				/>
			</div>
		</NumberFlowGroup>
	);
}
