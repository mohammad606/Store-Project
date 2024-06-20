'use client'
import { Dialog, Transition } from '@headlessui/react'
import {Fragment} from 'react'
import Form from "@/app/components/common/ui/Form";
import Input from "@/app/components/common/ui/InputsFilds/Input";
import {typeItemOrQtn} from "@/app/components/Pages/edit/EditOrder";
import {StoreService} from "@/services/seviceDirect/StoreService";
import {Store} from "@/services/module/Store";
import ApiSelect from "@/app/components/common/ui/InputsFilds/ApiSelector";
import HandleEditOrder from "@/app/hook/HaandleEditOrder";
import {toast} from "react-toastify";
import {Output} from "@/services/module/Output";



const EditQtnOrItem = ({typeEdit,typePop ,order,isOpen,closeModal}:{typeEdit:"output"|"input",typePop:typeItemOrQtn,order:any | Output,isOpen:boolean,closeModal:any})=>{


    const handleSubmit = async (dataField:any)=>{
        await HandleEditOrder(dataField.item,typePop,order,typeEdit)
        closeModal()
        return  toast.success("success", { theme: "dark" });

    }
    const items :string[]=order.items
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                {/*// @ts-ignore*/}
                                <Form handleSubmit={handleSubmit}>
                                    {typePop && typePop.type == "item"?

                                           <ApiSelect
                                               filtarItems={items}
                                               required={true}
                                               placeHolder={"Select Clinic name ..."}
                                               name={"item"}
                                               api={() =>
                                                   StoreService.make<StoreService>().ReadDataBase()
                                               }
                                               label={"Item Name"}
                                               optionValue={"item"}
                                               getOptionLabel={(data: Store) =>{

                                                       return data.item

                                               }}
                                           />

                                    :
                                    <Input name={'item'} label={"Qtn :"} type={'number'} role={"Qtn In Required"} />
                                    }
                                </Form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default EditQtnOrItem