import { PatientInterface } from "./IPat"
import { UserInterface } from "./IUser";

export interface ScreeningInterface {
	ID			: string;
	Patient		: PatientInterface;
	Dentistass	: UserInterface;
	Illnesses	: string;
	Queue		: number;
	Date		: Date;
}