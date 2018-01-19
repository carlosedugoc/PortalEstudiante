export class Contact {
    constructor(
        public priority: string,
        public lastName: string,
        public firstName: string,
        public relationshipId: string,
        public description: string,
        public phoneArea?: number,
        public phoneNumber?: number
    ) { }

}
