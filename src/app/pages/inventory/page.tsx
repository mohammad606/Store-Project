import {InventoryService} from "@/services/seviceDirect/InventoryService";
import ClientInventoryPage from "@/app/components/Pages/inventory/ClientInventoryPage";
import {Inventory} from "@/services/module/Inventory";


const page = async () => {

    const inventory = await InventoryService.make<InventoryService>().limitToLast(10)
    const res :Inventory[]= inventory ?? []
    return (
        <ClientInventoryPage  inventory={res}/>
    )

}

export default page