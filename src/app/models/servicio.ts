import { Item } from "./item";
export class Servicio {
    constructor(
        public id:number,
        public name:string,
        public categoryId:number,
        public categoryName:string,
        public data:Item[],
        public url:string,
        public status:boolean
    ){}
}
