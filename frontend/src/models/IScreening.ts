import { PatientInterface } from "./IPat"
import { UserInterface } from "./IUser"
import { MedicalProductInterface } from "./IMedicalProduct";

export interface ScreeningInterface {
	ID				: string;
	
	//Patient	FK
	PatientID		: number;
	Patient			: PatientInterface;

	//User	FK
	DentistassID	: number;
	Dentistass		: UserInterface;

	//Medical_product	FK
	MedicalProductID: number
	MedicalProduct	: MedicalProductInterface

	Illnesses		: string;
	Queue			: number;
	Scrdate			: Date;
}