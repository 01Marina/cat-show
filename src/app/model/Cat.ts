import { Breed } from "./Breed";

export interface Cat {
	id: string;
	url: string;
	breeds: Breed[];
	width: number;
	height: number;
}
