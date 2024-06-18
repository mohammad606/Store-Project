import {InputService} from "@/services/seviceDirect/InputService";
import ClientAllReceivedPage from "@/app/components/common/ClientAllReceivedPage";
import {Input} from "@/services/module/Input";


const page =async () => {

    const inputData = await InputService.make<InputService>().ReadDataBase()
    const res : Input[] = inputData.data ?? []
    return (
        <div className='min-w-screen min-h-screen' >
            <ClientAllReceivedPage  inputData={res}/>
        </div>
    )
}

export default page