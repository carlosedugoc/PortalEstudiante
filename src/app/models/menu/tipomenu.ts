import { Menu } from "./menu";
export class TipoMenu {
    constructor(
        public id:number,
        public name:string,
        public options:Menu[]
    ){}
}
