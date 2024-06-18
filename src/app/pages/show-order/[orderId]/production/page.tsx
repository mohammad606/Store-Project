import {InputService} from "@/services/seviceDirect/InputService";
import {Input} from "@/services/module/Input";
import ClientShowProduction from "@/app/components/Pages/show/ClientShowProduction";


const page = async ({ params:{ orderId } }: { params: { orderId: number } })=>{


    const order = await InputService.make<InputService>().ReadDataBase()
    const res : Input[] = order.data ?? []
    return (
        <ClientShowProduction order={res}/>
    )
}

export default page