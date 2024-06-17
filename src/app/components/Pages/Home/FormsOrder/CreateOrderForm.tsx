import { Dialog, Transition } from '@headlessui/react'
import {Fragment, useEffect, useState} from 'react'
import PageCard from "@/app/components/PageCard";
import Form from "@/app/components/LayoutForms/Form";
import Input from "@/app/components/LayoutForms/InputsFilds/Input";
import {StoreService} from "@/services/seviceDirect/StoreService";
import {Store} from "@/services/module/Store";
import ApiSelect from "@/app/components/LayoutForms/InputsFilds/ApiSelector";
import DatePicker from "@/app/components/LayoutForms/InputsFilds/DatePicker";
import DeleteIcon from "@/app/components/icons/DeleteIcon";
import ClearIcon from "@/app/components/icons/ClearIcon";
import {OutputService} from "@/services/seviceDirect/OutputService";
import {HandleAddOrRemoveData} from "@/app/hook/HandleAddOrRemoveData";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import XMarkIcon from "@/app/components/icons/XMarkIcon";
import Swal from "sweetalert2";

export interface OrderType{
    sender:string,
    client:string,
    date:string,
    noa:number|undefined,
    qtn:number[],
    items:string[],
}

const CreateOrderForm=({isOpenCreate,closeModal}:{isOpenCreate:boolean,closeModal:any})=>{
    const [arrayOfItems , setArrayOfItems] = useState<string[]>([])
    const [arrayOfQtn, setArrayOfQtn] = useState<number[]>([])
    const [dataSend,setDataSend] = useState<OrderType>({
        sender:"",
        client:"",
        date:"",
        noa:undefined,
        qtn:[],
        items:[],
    })
    const handleSubmit=(data:any)=>{
        if(!arrayOfItems.includes(data.item) || data.item != ""){
            setArrayOfItems([...arrayOfItems,data.item])
            setArrayOfQtn([...arrayOfQtn,Number(data.qtn)])
        }
        setDataSend({
            items:arrayOfItems,
            qtn:arrayOfQtn,
            date: data.date,
            noa:data.noa,
            client:data.client,
            sender:data.sender
        })
        return data
    }
    useEffect(()=>{
        setDataSend({
            items:arrayOfItems,
            qtn:arrayOfQtn,
            date: dataSend.date,
            noa:dataSend.noa,
            client:dataSend.client,
            sender:dataSend.sender
        })
    },[arrayOfItems])
    const handleDelete = (index:number) => {
        const newItems = arrayOfItems.filter((_, i) => i !== index);
        const newQuantities = arrayOfQtn.filter((_, i) => i !== index);
        setArrayOfItems(newItems);
        setArrayOfQtn(newQuantities);
        console.log(dataSend)
    };


    let combinedArray = arrayOfItems.map((item:string, index) => {
        return {id: index, item: item, qtn: arrayOfQtn[index] };
    });

    const handleClearData = ()=>{
        setDataSend({
            sender:"",
            client:"",
            date:"",
            noa:undefined,
            qtn:[],
            items:[],
        })
        setArrayOfItems([])
        setArrayOfQtn([])

    }
    const {data} = useQuery({
        queryFn : async ()=>{
            return await StoreService.make<StoreService>().ReadDataBase()
        },
        queryKey:["StoreData"]
    })
    const handleSendData =async ()=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't Save The Order!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                return await OutputService.make<OutputService>().limitToLast(1).then(async(res)=>{
                    const id = res[0] ? res[0].id +1 : 0
                    const allQtn = dataSend.qtn.reduce((acc, current) => acc + current, 0);
                    const send = {
                        qtn:dataSend.qtn,
                        items:dataSend.items,
                        noa:dataSend.noa,
                        sender:dataSend.sender,
                        client:dataSend.client,
                        date:dataSend.date,
                        id:id,
                        allQtn:allQtn
                    }
                    return await OutputService.make<OutputService>().store(id,send).then(()=>{
                        HandleAddOrRemoveData(send.items,send.qtn,data?.data,"remove")
                        toast.success("success",{theme:"dark"});
                        handleClearData()
                        closeModal('create')
                    })
                })
            }
        });


    }


    return (
        <>
            <Transition appear show={isOpenCreate} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={()=>closeModal('create')}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md min-w-[50vw] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                   <PageCard>
                                       <div className="flex justify-between items-center w-full h-12">
                                           <h2 className="card-title">Add Order</h2>

                                           <div className={'flex'}>
                                               <div onClick={handleClearData} className='w-fit p-2 hover:bg-gray-300 rounded-full cursor-pointer mr-2'>
                                                   <ClearIcon className={'h-8 w-8 '}/>
                                               </div>
                                               <div onClick={()=>closeModal('create')} className='w-fit p-2 hover:bg-gray-300 rounded-full cursor-pointer'>
                                                   <XMarkIcon className={'h-8 w-8 '}/>
                                               </div>
                                           </div>
                                       </div>
                                       <Form handleSubmit={handleSubmit}  messageSuccess={""} buttonText="Add" defaultValues={dataSend??[]}>
                                           <div className={'grid md:grid-cols-2 gap-5 '}>
                                               <div>
                                                   <Input required={true} label={"Noa :"} name={'noa'} type={"number"} role={"Qtn Is Required"}/>
                                                   <Input required={true} label={"Client :"} name={'client'} type={"text"} role={"Qtn Is Required"}/>
                                                   <Input required={true} label={"Sender :"} name={'sender'} type={"text"} role={"Qtn Is Required"}/>
                                               </div>
                                               <div>
                                                   <DatePicker required={true} label={"Date :"} name={'date'} />
                                                   <ApiSelect
                                                       required={true}
                                                       placeHolder={"Select Clinic name ..."}
                                                       name={"item"}
                                                       api={() =>
                                                           StoreService.make<StoreService>().ReadDataBase()
                                                       }
                                                       label={"Item Name"}
                                                       optionValue={"item"}
                                                       getOptionLabel={(data:Store) => (data.item)}
                                                   />
                                                   <Input required={true} label={"Qtn :"} name={'qtn'} type={"number"} role={"Qtn Is Required"}/>
                                               </div>
                                           </div>
                                       </Form>
                                       <div className="overflow-x-auto">
                                           <table className="table">
                                               <thead>
                                               <tr>
                                                   <th>Name</th>
                                                   <th>qtn</th>
                                                   <th>delete</th>
                                               </tr>
                                               </thead>
                                               <tbody>
                                               {combinedArray?.map((e,index)=>(
                                                   <tr key={index}>
                                                       <td >{e.item}</td>
                                                       <td>{e.qtn}</td>
                                                       <td onClick={()=>handleDelete(e.id)} ><div className='w-fit p-1 hover:bg-gray-300 rounded-full cursor-pointer'>
                                                           <DeleteIcon className={'h-8 w-8 '}/>
                                                       </div></td>
                                                   </tr>
                                               ))}
                                               </tbody>
                                           </table>
                                       </div>
                                       <div className='w-full flex justify-center mt-3'>
                                           <button type={'button'} onClick={handleSendData} className="btn btn-info">Send Order</button>
                                       </div>
                                   </PageCard>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default CreateOrderForm