import {InputService} from "@/services/seviceDirect/InputService";
import {OutputService} from "@/services/seviceDirect/OutputService";
import ClientPageHome from "@/app/components/Pages/Home/ClientPageHome";


const Home =async () => {

    const inputLimitData = await InputService.make<InputService>().limitToLast(10)
    const outLimitData = await OutputService.make<OutputService>().limitToLast(10)

    return (
        <div className='min-w-screen min-h-screen' >
          <ClientPageHome inputLimitData={inputLimitData} outLimitData={outLimitData}/>
        </div>
    )
}

export default Home