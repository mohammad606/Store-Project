import {OutputService} from "@/services/seviceDirect/OutputService";
import {Output} from "@/services/module/Output";
import ClientShowOrderTable from "@/app/components/Pages/show/ClientShowOrderTable";


const page = async ({ params:{ orderId } }: { params: { orderId: number } })=>{


   const order = await OutputService.make<OutputService>().ReadDataBase()
   const res : Output[] = order.data ?? []
    return (
        <ClientShowOrderTable order={res}/>
    )
}

export default page