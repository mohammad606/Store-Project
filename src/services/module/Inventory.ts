import {Store} from "@/services/module/Store";


export interface Inventory {
    id:number,
    date:string,
    note:string,
    data :Store[]
}