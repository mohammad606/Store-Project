
import {StoreService} from "@/services/seviceDirect/StoreService";
import {Store} from "@/services/module/Store";


export  const HandleAddOrRemoveData = (items:string[],qtn:number[],dataStore:Store[]|undefined|null,type:string)=>{

    const handleType = (e:Store,d:name_Qtn)=>{
        if(type == 'remove'){
            return {qtn: e.qtn - d.qtn}
        }else {
            return {qtn: e.qtn + d.qtn}
        }
    }
    dataStore?.forEach((e:Store)=>{
        const mergedArray:name_Qtn[] = items.map((key:string, index:number) => ({'name' : key ,'qtn' : qtn[index]}))
        mergedArray.forEach(async (d:name_Qtn)=>{
            if(e.item == d.name){
               return await StoreService.make<StoreService>().update(e.id,handleType(e, d))
            }
        })
    })

}

type name_Qtn = {
    name:string,
    qtn:number
}