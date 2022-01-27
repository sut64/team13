import { TreatmentInteface } from "./ITreatment";
import { UserInterface } from "./IUser";
import { MedicalProductInterface } from "./IMedicalProduct";

export interface MedRecordInterface{
    ID :number,
    Amount: number,
    Datetime: Date,
    AdviceText: string,
    TreatmentID: number,
    Treatment: TreatmentInteface,

    PharmacistID : number,
    Pharmacist: UserInterface

    MedicalProductID: number,
    MedicalProduct: MedicalProductInterface,
}