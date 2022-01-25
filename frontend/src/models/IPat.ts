
import { SexInterface } from "./ISex";
import { JobInterface } from "./IJob";
import { InsuranceInterface } from "./IIns";
import { UserInterface } from "./IUser";

export interface PatientInterface {

    ID: number,
    Firstname: string;
    Lastname: string;
    Birthday: Date;
    IDcard: string;
    Tel: string;
    Wight : number;
    Height : number;
    Time: Date;
    SexID: number;
    JobID: number;
    InsuranceID: number;
    NurseID: number;
    Sex: SexInterface;
    Job: JobInterface;
    Insurance: InsuranceInterface;
    Nurse: UserInterface;

   }