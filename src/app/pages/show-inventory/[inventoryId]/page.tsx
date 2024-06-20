import {InventoryService} from "@/services/seviceDirect/InventoryService";
import ClientInventoryTable from "@/app/components/Pages/show-inventory/ClientInventoryTable";
import {Store} from "@/services/module/Store";


const page =async ({params :{inventoryId}}:{params:{inventoryId:number}}) =>{

    const store = await InventoryService.make<InventoryService>().show(inventoryId)
    const res :Store[]= store?.data.data
    return (
        <ClientInventoryTable store={res} date={store.data.date}/>

    )
}

export default page