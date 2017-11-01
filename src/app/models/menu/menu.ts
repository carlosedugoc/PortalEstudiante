import { SubMenu } from "./submenu";
export class Menu {
    constructor(
        public id:number,
        public name:string,
        public logo?:string,
        public description?:string,
        public url?:string,
        public data?:SubMenu[]
    ){}
}
