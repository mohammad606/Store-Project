import {OutputService} from "@/services/seviceDirect/OutputService";
import BarChart from "@/app/components/Pages/dashboard/ChartOrder";
import {Output} from "@/services/module/Output";
import {InputService} from "@/services/seviceDirect/InputService";
import {Input} from "@/services/module/Input";


const page = async () => {

    const input = await InputService.make<InputService>().ReadDataBase()
    const output = await OutputService.make<OutputService>().ReadDataBase()
    const resOutput: Output[] = output.data ?? []
    const resInput: Input[] = input.data ?? []
    return (
        <div className='w-full h-[92vh]'>


           <div className={'flex flex-col justify-center items-center '}>


               <div className=" h-[35vh] md:max-w-fit card bg-base-100 m-2 shadow-gray-500 shadow-2xl m-4 p-4">
                   <h2 className={'card-title'}>Most Input</h2>
                   <BarChart orders={resInput}/>
               </div>

                   <div className=" h-[35vh] md:max-w-fit card bg-base-100 m-2 shadow-gray-500 shadow-2xl m-4 p-4">
                       <h2 className={'card-title'}>Most Output</h2>
                       <BarChart orders={resOutput}/>
                   </div>




           </div>

        </div>
    )
}

export default page