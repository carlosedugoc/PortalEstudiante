export class ItemSubMenu {
    constructor(
        public id:number,
        public name:string,
        public origin:number,
        public url?:string,
        public data?:ItemSubMenu[] 
    ){}   
}
