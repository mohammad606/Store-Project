import {useState} from "react";
import {useRouter} from "next/navigation";
import AddItemToStore from "@/app/components/Pages/store/AddItemToStore";
import EditItemFromStore from "@/app/components/Pages/store/EditItemFromStore";
import SaveInventory from "@/app/components/Pages/store/SaveInventory";


const EditStoreButtonBar = ({
                                startTransition,
                                setPending
                            }: {
    startTransition: any,
    setPending: React.Dispatch<boolean>
}) => {

    let [isOpenCreate, setIsOpenCreate] = useState(false)
    let [isOpenAdd, setIsOpenAdd] = useState(false)
    let [isOpenSave, setIsOpenSave] = useState(false)

    const rot = useRouter()

    function closeModal(type: "edit" | "add" | "save") {
        if (type == "edit") {
            setIsOpenCreate(false)
            setPending(true);
            startTransition(rot.refresh);
            setPending(false);

        } else if (type == 'add') {
            setIsOpenAdd(false)
            setPending(true);
            startTransition(rot.refresh);
            setPending(false);

        } else if (type == 'save') {
            setIsOpenSave(false)
        }
    }

    function openModal(type: "edit" | "add" | "save") {
        if (type == "edit") {
            setIsOpenCreate(true)
        } else if (type == "add") {
            setIsOpenAdd(true)
        } else if (type == 'save') {
            setIsOpenSave(true)
        }
    }


    return (
        <>
            <div className="navbar bg-base-100 flex justify-center">
                <div className='w-8/12 flex flex-wrap justify-center md:justify-between items-center'>
                    <div className=''>
                        <button onClick={() => openModal('edit')} type='button' className="btn btn-info my-2 mx-3">Edit
                            Item
                        </button>
                    </div>
                    <div>
                        <button onClick={() => openModal('add')} type='button' className="btn btn-success my-2 mx-3">Add
                            Items
                        </button>
                    </div>
                    <div>
                        <button onClick={() => openModal('save')} type='button' className="btn btn-warning my-2 mx-3">Save
                            Inventory
                        </button>
                    </div>
                </div>
                <AddItemToStore isOpenAdd={isOpenAdd} closeModal={closeModal}/>
                <EditItemFromStore isOpenCreate={isOpenCreate} closeModal={closeModal}/>
                <SaveInventory isOpenSave={isOpenSave} closeModal={closeModal}/>

            </div>
        </>
    )
}

export default EditStoreButtonBar