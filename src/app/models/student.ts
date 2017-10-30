import { Residence } from "./residence";
export class Student {
    constructor(
        public studentId:string,
        public identification:string,
        public identificationType:string,
        public firstName:string,
        public middleName:string,
        public lastName:string,
        public gender:string,
        public maritalStatus:string,
        public birthDate:string,
        public emailPersonal:string,
        public emailInstitutional:string,
        public landline:string,
        public mobilePhone:string,
        public alternativeMail:string,
        public nacionalityId:string,
        public userName:string,
        public residence:Residence
    ){}
}
