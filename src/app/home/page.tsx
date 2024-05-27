import {InputService} from "@/services/seviceDirect/InputService";
import {OutputService} from "@/services/seviceDirect/OutputService";
import ClientPageHome from "@/app/components/home/ClientPageHome";


const Home =async () => {

    const inputLimitData = await InputService.make<InputService>().limitToLast(5)
    const outLimitData = await OutputService.make<OutputService>().limitToLast(5)

    return (
        <div className='min-w-screen min-h-screen' style={{
            background:
                "linear-gradient(to bottom, rgba(249, 250, 251, 0.9), rgba(249, 250, 251, 0.9)), url(https://dc621.4shared.com/img/GqP7JQWBjq/s24/18e1e7686a0/overlay_4?async&rand=0.9085352286261172)",
        }}>
          <ClientPageHome inputLimitData={inputLimitData} outLimitData={outLimitData}/>
        </div>
    )
}

export default Home