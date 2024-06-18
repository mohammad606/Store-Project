"use client"
import {Output} from "@/services/module/Output";
import ClientAllOrderPage from "@/app/components/common/ClientAllOrderPage";


const ClientShowOrderTable = ({order}:{order:Output[]}) =>{

    const item = window.localStorage.getItem('orderItem')
    let allOrder :Output[] = []
    order?.forEach((e:Output)=>{
        const arrayItem =[...e.items]
        arrayItem.forEach((f:string)=>{
            if(f == item ){
                allOrder.push(e)
            }else {

            }
        })
    })

    return (
        <ClientAllOrderPage outLimitData={allOrder}/>
    )
}

export default ClientShowOrderTable