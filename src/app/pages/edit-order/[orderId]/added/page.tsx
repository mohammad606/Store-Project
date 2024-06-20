import {InputService} from "@/services/seviceDirect/InputService";
import {Input} from "@/services/module/Input";
import EditOrder from "@/app/components/Pages/edit/EditOrder";


const page = async ({params:{orderId}}:{params:{orderId:number}})=>{

    const order = await InputService.make<InputService>().show(orderId)
    const res :Input = order.data ?? {}
    return (
        <EditOrder order={res} pageType={'input'}/>
    )
}

export default page