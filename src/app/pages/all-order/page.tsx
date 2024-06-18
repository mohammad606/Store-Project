import {OutputService} from "@/services/seviceDirect/OutputService";
import ClientAllOrderPage from "@/app/components/common/ClientAllOrderPage";
import {Output} from "@/services/module/Output";


const Home =async () => {

    const outLimitData = await OutputService.make<OutputService>().ReadDataBase()
    const res : Output[] = outLimitData.data ?? []
    return (
        <div className='min-w-screen min-h-screen' >
            <ClientAllOrderPage  outLimitData={res}/>
        </div>
    )
}

export default Home