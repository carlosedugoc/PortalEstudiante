export class University {
    constructor(
        public id: string,
        public name: string,
        public code: string,
        public regulationUrl: string,
        public regulationName: string,
        public status: boolean
    ) { }
}