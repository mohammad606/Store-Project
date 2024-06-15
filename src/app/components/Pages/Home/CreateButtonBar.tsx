import {useState} from "react";
import CreateOrderForm from "@/app/components/Pages/Home/FormsOrder/CreateOrderForm";
import AddedItemsForm from "@/app/components/Pages/Home/FormsOrder/AddedItemsForm";
import {useRouter} from "next/navigation";


const CreateButtonBar = ({
                             startTransition,
                             setPending
                         }:{
    startTransition:any,
    setPending:React.Dispatch<boolean>
}) => {

    let [isOpenCreate, setIsOpenCreate] = useState(false)
    let [isOpenAdd, setIsOpenAdd] = useState(false)
    const rot = useRouter()

    function closeModal(type:"create"|"add") {
        if(type == "create"){
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

    function openModal(type:"create"|"add") {
        if(type == "create"){
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
                            <button onClick={()=>openModal('create')} type='button' className="btn btn-info mx-3">Create Order</button>
                        </div>
                        <div>
                            <button onClick={()=>openModal('add')} type='button' className="btn btn-success mx-3">Add Items</button>
                        </div>
                    </div>
                <CreateOrderForm isOpenCreate={isOpenCreate} closeModal={closeModal}/>
                <AddedItemsForm isOpenAdd={isOpenAdd} closeModal={closeModal}/>

            </div>
        </>
    )
}

export default CreateButtonBar