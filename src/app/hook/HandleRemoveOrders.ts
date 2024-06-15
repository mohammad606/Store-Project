import {Input} from "@/services/module/Input";
import {Output} from "@/services/module/Output";
import {StoreService} from "@/services/seviceDirect/StoreService";
import {InputService} from "@/services/seviceDirect/InputService";
import {OutputService} from "@/services/seviceDirect/OutputService";
import {Store} from "@/services/module/Store";



const HandleRemoveOrder = (store:Store[],allData:Input[]|Output[],id:number,items:string[],qtn:number[],type:string)=>{

    const HandleType = (i:any,e:any)=>{
        if(type == "order"){
            return {qtn: Number(i.qtn) + Number(e.qtn)}
        }else {
            return {qtn: Number(i.qtn) - Number(e.qtn)}
        }
    }
    allData.forEach((e:any)=>{
        if(e.id === id){
            const mergedArray = items.map((key:string, index:number) => ({'name' : key ,'qtn' : qtn[index]}))
            console.log(mergedArray)
            mergedArray.map(e=>{
                store?.forEach(i=>{
                    if(i.item === e.name ){
                        return  StoreService.make<StoreService>().update(i.id,HandleType(i,e));
                    }
                })
            })
            if(type == "order"){
               return  OutputService.make<OutputService>().update(e.id, {delete: true})
            }else {
               return  InputService.make<InputService>().update(e.id, {delete: true})
            }
        }
    })


}

export default HandleRemoveOrder