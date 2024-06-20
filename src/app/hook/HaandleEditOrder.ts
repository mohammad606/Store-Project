import Swal from "sweetalert2";
import {Store} from "@/services/module/Store";
import {StoreService} from "@/services/seviceDirect/StoreService";
import {OutputService} from "@/services/seviceDirect/OutputService";
import {InputService} from "@/services/seviceDirect/InputService";
import {typeItemOrQtn} from "@/app/components/Pages/edit/EditOrder";

export type data = {
    id:number
    allQtn:number
    items:string[]
    qtn:number[]
    date:string
    noa?:number
    oop?:string
    delete?:boolean
    sender?:string
    client?:string
}


function replaceElement(array:string[] | number[],id:number, oldElement:string | number, newElement:string | number) {
    array.forEach((e,index)=>{
        if(index == id){
            return array[index] = newElement ;
        }
    })
    return array
}

function getOldQtn(array:number[] | string[],id:number){
    let qtn;
     array.forEach((e,index)=>{
        if(index == id){
            return qtn = e
        }
    })
    return qtn
}

function getIdAndQtnItemInStore (store:Store[],item:string | number){
    let id;
    let qtn;
    store.forEach((e)=>{
        if(e.item == item ){
           qtn = e.qtn
            return  id = e.id
        }
    })
    return {
        id:id,
        qtn:qtn
    }
}

const HandleEditOrder = async (data: string | number ,
                               dataEdit: typeItemOrQtn,
                               dataOrder: data,
                               typeOrder: string) => {
    const dataStoreRes = await StoreService.make<StoreService>().ReadDataBase()
    const dataStore: Store[] = dataStoreRes.data ?? []
    const handleEditItem = async ()=>{
        const newArrayItem = replaceElement(dataOrder.items,dataEdit.id,dataEdit.data,data)
        const oldQtn = getOldQtn(dataOrder.qtn,dataEdit.id)
        const qtnAndIdItemInStoreOld = getIdAndQtnItemInStore(dataStore,dataEdit.data)
        const qtnAndIdItemInStoreNew = getIdAndQtnItemInStore(dataStore,data)

        if(typeOrder == "output"){
            let oldItemQtnInStore = Number(qtnAndIdItemInStoreOld?.qtn??0) + Number(oldQtn??0)
            let newItemQtnInStore = Number(qtnAndIdItemInStoreNew?.qtn??0) - Number(oldQtn??0)
            await StoreService.make<StoreService>().update(qtnAndIdItemInStoreOld.id??0,{qtn:oldItemQtnInStore})
            await StoreService.make<StoreService>().update(qtnAndIdItemInStoreNew.id??0,{qtn:newItemQtnInStore})
            return await OutputService.make<OutputService>().update(dataOrder.id,{items:newArrayItem})
        }else if(typeOrder == 'input'){
            let oldItemQtnInStore = Number(qtnAndIdItemInStoreOld?.qtn??0) - Number(oldQtn??0)
            let newItemQtnInStore = Number(qtnAndIdItemInStoreNew?.qtn??0) + Number(oldQtn??0)
            await StoreService.make<StoreService>().update(qtnAndIdItemInStoreOld.id??0,{qtn:oldItemQtnInStore})
            await StoreService.make<StoreService>().update(qtnAndIdItemInStoreNew.id??0,{qtn:newItemQtnInStore})
            return await InputService.make<InputService>().update(dataOrder.id,{items:newArrayItem})
        }
    }

    const handleEditQtn = async ()=>{
        const newArrayQtn = replaceElement(dataOrder.qtn,dataEdit.id,dataEdit.data,Number(data))
        const item = getOldQtn(dataOrder.items,dataEdit.id)
        const qtnOldItem = getIdAndQtnItemInStore(dataStore,item??"")
        if(typeOrder == "output"){
            const newQtnInStore = (dataEdit.data > data) ? Number(qtnOldItem.qtn??0) + (Number(dataEdit.data) - Number(data)) : (dataEdit.data < data) ? Number(qtnOldItem.qtn??0) - (Number(data) - Number(dataEdit.data)) : Number(qtnOldItem.qtn??0)
            await StoreService.make<StoreService>().update(qtnOldItem.id??0,{qtn:newQtnInStore})
            return await OutputService.make<OutputService>().update(dataOrder.id,{qtn:newArrayQtn})
        }else if(typeOrder == 'input'){
            const newQtnInStore = (dataEdit.data > data) ? Number(qtnOldItem.qtn??0) - (Number(dataEdit.data) - Number(data)) : (dataEdit.data < data) ? Number(qtnOldItem.qtn??0) + (Number(data) - Number(dataEdit.data)) : Number(qtnOldItem.qtn??0)
            await StoreService.make<StoreService>().update(qtnOldItem.id??0,{qtn:newQtnInStore})
            return await InputService.make<InputService>().update(dataOrder.id,{qtn:newArrayQtn})

        }
    }



    if(dataEdit.type == "item"){
       return await handleEditItem()
    }else if(dataEdit.type == "qtn"){
       return await handleEditQtn ()
    }
}

export default HandleEditOrder