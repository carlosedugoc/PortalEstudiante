import { User } from "../user";

export class AuthInfo {

    accesToken: string;
    claims: string;
    user: User;
    autorization?: any;

}