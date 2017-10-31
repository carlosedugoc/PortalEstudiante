import { ItemSubMenu } from "./itemsubmenu"    ;
export class SubMenu {
    constructor(
        public id:number,
        public name:string,
        public url?:string,
        public data?:ItemSubMenu[] 
    ){}
}
