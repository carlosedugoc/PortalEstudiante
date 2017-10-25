import { Item } from "./item";
export class Servicio {
    constructor(
        public id:number,
        public nombre:string,
        public idCategoria:number,
        public nombreCategoria:string,
        public datos:Item[],
        public url:string,
        public habilitar:boolean
    ){}
}
