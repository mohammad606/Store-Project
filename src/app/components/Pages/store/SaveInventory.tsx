'use client'
import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import PageCard from "@/app/components/common/ui/PageCard";
import Form from "@/app/components/common/ui/Form";
import {StoreService} from "@/services/seviceDirect/StoreService";
import DatePicker from "@/app/components/common/ui/InputsFilds/DatePicker";
import {InventoryService} from "@/services/seviceDirect/InventoryService";
import Textarea from "@/app/components/common/ui/InputsFilds/Textarea";


const SaveInventory = ({isOpenSave, closeModal}: { isOpenSave: boolean, closeModal: any }) => {


    const handleSubmit = async (data: any) => {

        const store = await StoreService.make<StoreService>().ReadDataBase()
        const inventory = await InventoryService.make<InventoryService>().limitToLast(1)
        const id = inventory ? inventory[0].id +1 : 0
        const dataSend = {
            id:id,
            date: data.date,
            data : store.data,
            note:data.note
        }
        return await InventoryService.make<InventoryService>().store(id, dataSend).then((res) => {
            closeModal('save')
            return res
        })


    }


    return (
        <Transition appear show={isOpenSave} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => closeModal('save')}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25"/>
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
                            <Dialog.Panel
                                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <PageCard>
                                    <Form handleSubmit={handleSubmit}
                                          defaultValues={[]}>
                                        <DatePicker name={'date'} label={'Date'}/>
                                        <Textarea name={'note'} label={'not'}/>
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

export default SaveInventory