import internal from "stream";
import { PatientInterface } from "./IPat";
import { RemedyInterface } from "./IRemedy";
import { UserInterface } from "./IUser";

export interface AppointInterface {
  ID: string,
  AppointTime: Date,
  Todo: string,
  Room: number,
  PatientID: number,
  Patient: PatientInterface,
  RemedyTypeID: number,
  RemedyType: RemedyInterface,
  DentistID: number,
  Dentist: UserInterface,
}