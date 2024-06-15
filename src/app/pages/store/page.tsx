import {StoreService} from "@/services/seviceDirect/StoreService";
import ClientStorePage from "@/app/components/Pages/store/ClientStorePage";
import {Store} from "@/services/module/Store";


const page = async ()=>{

    const store = await StoreService.make<StoreService>().ReadDataBase()
    const res :Store[]= store?.data ??[]
    return (
        <ClientStorePage store={res}/>
    )
}

export default page