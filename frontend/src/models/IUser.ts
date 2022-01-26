import { RoleInterface } from "./IRole";

export interface UserInterface {
    ID: number,
    Firstname: string;
    Lastname: string;
    Username: string;
    Password: string;
    RoleID : number;
	Role: RoleInterface;
}