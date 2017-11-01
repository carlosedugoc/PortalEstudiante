export class ItemSubMenu {
    constructor(
        public id:number,
        public name:string,
        public url?:string,
        public data?:ItemSubMenu[] 
    ){}   
}
