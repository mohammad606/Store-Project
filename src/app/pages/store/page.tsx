import {StoreService} from "@/services/seviceDirect/StoreService";


const page = async ()=>{

    const store = await StoreService.make<StoreService>().ReadDataBase()
    return (
        <></>
    )
}

export default page