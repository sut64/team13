import { RemedyInterface } from "./IRemedy"
import { ScreeningInterface } from "./IScreening"
import { UserInterface } from "./IUser"

export interface TreatmentInteface {
	ID 					: string;
	ToothNumber			: string;
	ToothFilling		: string;
	PrescriptionRaw		: string;
	PrescriptionNote	: string;
	Date				: Date;
	Screening 			: ScreeningInterface;
	RemedyType			: RemedyInterface;
	Dentist				: UserInterface;
}