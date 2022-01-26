import { UserInterface } from "./IUser";
import { PatientInterface } from "./IPat";
import { RemedyInterface } from "../models/IRemedy";
export interface PaymentInterface {
    ID: number,
    Price: number,
    Pricetext: String,
    Note: String,
    FinancialID: number,
    Financial: UserInterface,
    PatientID: number,
    Patient: PatientInterface,
    RemedyTypeID: number,
    RemedyType: RemedyInterface,

    Paytime: Date,
}