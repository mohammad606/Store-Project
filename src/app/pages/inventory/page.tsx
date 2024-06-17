import {InventoryService} from "@/services/seviceDirect/InventoryService";
import ClientInventoryPage from "@/app/components/Pages/inventory/ClientInventoryPage";
import {Inventory} from "@/services/module/Inventory";


const page = async () => {

    const inventory = await InventoryService.make<InventoryService>().ReadDataBase()
    const res :Inventory[]= inventory?.data ?? []
    return (
        <ClientInventoryPage  inventory={res}/>
    )

}

export default page