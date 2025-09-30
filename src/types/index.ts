export type Invasion = {
	id: string;
};

export type CogType = "bossbot" | "cashbot" | "lawbot" | "sellbot";

export type Cog = {
	name: string;
	type: CogType;
	image: string;
};
