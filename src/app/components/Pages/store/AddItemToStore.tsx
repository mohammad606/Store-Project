'use client'
import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import PageCard from "@/app/components/common/ui/PageCard";
import Form from "@/app/components/common/ui/Form";
import {StoreService} from "@/services/seviceDirect/StoreService";
import {Store} from "@/services/module/Store";
import Input from "@/app/components/common/ui/InputsFilds/Input";


const AddItemToStore = ({isOpenAdd, closeModal}: { isOpenAdd: boolean, closeModal: any })=>{


    const handleSubmit =async (data:any)=>{
         const store = await StoreService.make<StoreService>().limitToLast(1)
         const id = store[0] ? store[0].id +1 : 0
        const dataSend :Store= {
             id:id,
            ...data
        }
        return await StoreService.make<StoreService>().store(id,dataSend).then(res=>{
            closeModal('add')
            return res
        })

    }


    return (
        <Transition appear show={isOpenAdd} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={()=>closeModal('add')}>
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
                                <PageCard>
                                    <Form handleSubmit={handleSubmit}
                                          defaultValues={ []}>
                                        <Input required={true} label={"Item Name :"} name={'item'} type={"text"}
                                               role={"Item Is Required"}/>
                                        <Input required={true} label={"Box :"} name={'box'} type={"number"}
                                               role={"Box Is Required"}/>
                                        <Input required={true} label={"Qtn :"} name={'qtn'} type={"number"}
                                               role={"Qtn Is Required"}/>
                                    </Form>
                                </PageCard>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default AddItemToStore