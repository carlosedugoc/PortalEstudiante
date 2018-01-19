import { Contact } from "./contact";
import { Residence } from "./residence";
import { AcademicRecords } from "./academic-records";
import { AcademicProgram } from "../../academic-program";

export class Student {
    constructor(
        public studentId: number,
        public identification: string,
        public identificationType: string,
        public firstName: string,
        public middleName: string,
        public lastName: string,
        public gender: string,
        public maritalStatus: string,
        public birthDate: Date,
        public emailPersonal: string,
        public emailInstitutional: string,
        public landline: string,
        public mobilePhone: string,
        public alternativeMail: string,
        public nacionalityId: string,
        public userName: string,
        public work: string,
        public job: string,
        public photo: string,
        public cityBirth: string,
        public bloodGroupType: string,
        public contact: Contact,
        public residence: Residence,
        public academicRecords: AcademicRecords[],
        public workPhone?: number,
        public extensionWorkPhone?: number
    ) { }
}
