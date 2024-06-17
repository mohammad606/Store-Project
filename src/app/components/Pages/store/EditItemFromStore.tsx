'use client'
import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useState} from "react";
import PageCard from "@/app/components/PageCard";
import Form from "@/app/components/LayoutForms/Form";
import {StoreService} from "@/services/seviceDirect/StoreService";
import {Store} from "@/services/module/Store";
import Input from "@/app/components/LayoutForms/InputsFilds/Input";
import ApiSelect from "@/app/components/LayoutForms/InputsFilds/ApiSelector";


const EditItemFromStore = ({isOpenCreate, closeModal}: { isOpenCreate: boolean, closeModal: any })=>{

    const [id,setId] = useState<number>(0)
    const handleSubmit =async (data:any)=>{

        return await StoreService.make<StoreService>().update(id,data).then(res=>{
            closeModal('edit')
            return res
        })

    }


    return (
        <Transition appear show={isOpenCreate} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={()=>closeModal('edit')}>
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
                                        <ApiSelect
                                            required={true}
                                            placeHolder={"Select Clinic name ..."}
                                            name={"item"}
                                            api={() =>
                                                StoreService.make<StoreService>().ReadDataBase()
                                            }
                                            onSelect={(selectedItem)=>{
                                               return setId(selectedItem?.id ?? 0)
                                            }}
                                            label={"Item Name"}
                                            optionValue={"item"}
                                            getOptionLabel={(data: Store) => (data.item)}
                                        />
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

export default EditItemFromStore