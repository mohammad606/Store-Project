import {OutputService} from "@/services/seviceDirect/OutputService";
import EditOrder from "@/app/components/Pages/edit/EditOrder";
import {Output} from "@/services/module/Output";


const page = async ({params:{orderId}}:{params:{orderId:number}})=>{

    const order = await OutputService.make<OutputService>().show(orderId)
    const res :Output = order.data ?? {}
    return (
        <EditOrder order={res} pageType={'output'}/>
    )
}

export default page