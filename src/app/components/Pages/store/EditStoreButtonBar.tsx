import {useState} from "react";
import CreateOrderForm from "@/app/components/Pages/Home/FormsOrder/CreateOrderForm";
import AddedItemsForm from "@/app/components/Pages/Home/FormsOrder/AddedItemsForm";
import {useRouter} from "next/navigation";
import AddItemToStore from "@/app/components/Pages/store/AddItemToStore";


const EditStoreButtonBar = ({
                             startTransition,
                             setPending
                         }:{
    startTransition:any,
    setPending:React.Dispatch<boolean>
}) => {

    let [isOpenCreate, setIsOpenCreate] = useState(false)
    let [isOpenAdd, setIsOpenAdd] = useState(false)
    const rot = useRouter()

    function closeModal(type:"edit"|"add") {
        if(type == "edit"){
            setIsOpenCreate(false)
            setPending(true);
            startTransition(rot.refresh);
            setPending(false);
        }else {
            setIsOpenAdd(false)
            setPending(true);
            startTransition(rot.refresh);
            setPending(false);
        }
    }

    function openModal(type:"edit"|"add") {
        if(type == "edit"){
            setIsOpenCreate(true)
        }else {
            setIsOpenAdd(true)
        }
    }


    return (
        <>
            <div className="navbar bg-base-100 flex justify-center">
                    <div className='w-8/12 flex justify-between items-center'>
                        <div className=''>
                            <button onClick={()=>openModal('edit')} type='button' className="btn btn-info mx-3">Edit Item</button>
                        </div>
                        <div>
                            <button onClick={()=>openModal('add')} type='button' className="btn btn-success mx-3">Add Items</button>
                        </div>
                    </div>
                   <AddItemToStore isOpenAdd={isOpenAdd} closeModal={closeModal}/>

            </div>
        </>
    )
}

// @ts-ignore
export default EditStoreButtonBar