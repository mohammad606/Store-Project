import {useState} from "react";
import CreateOrderForm from "@/app/components/Pages/Home/FormsOrder/CreateOrderForm";


const CreateButtonBar = () => {

    let [isOpenCreate, setIsOpenCreate] = useState(false)
    let [isOpenAdd, setIsOpenAdd] = useState(false)


    function closeModal(type:"create"|"add") {
        if(type == "create"){
            setIsOpenCreate(false)
        }else {
            setIsOpenAdd(false)
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
            </div>
        </>
    )
}

export default CreateButtonBar