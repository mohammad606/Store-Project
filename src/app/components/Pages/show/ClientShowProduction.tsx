"use client"
import {Input} from "@/services/module/Input";
import ClientAllReceivedPage from "@/app/components/common/ClientAllReceivedPage";


const ClientShowProduction = ({order}:{order:Input[]}) =>{

    const item = window.localStorage.getItem('productionItem')
    let allOrder :Input[] = []
    order?.forEach((e:Input)=>{
        const arrayItem =[...e.items]
        arrayItem.forEach((f:string)=>{
            if(f == item ){
                allOrder.push(e)
            }else {

            }
        })
    })

    return (
        <ClientAllReceivedPage inputData={allOrder}/>
    )
}

export default ClientShowProduction