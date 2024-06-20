import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useState} from 'react'
import Form from "@/app/components/common/ui/Form";
import DatePicker from "@/app/components/common/ui/InputsFilds/DatePicker";
import Input from "@/app/components/common/ui/InputsFilds/Input";
import {OutputService} from "@/services/seviceDirect/OutputService";
import {useRouter} from "next/navigation";
import {InputService} from "@/services/seviceDirect/InputService";
import SelectPopOver from "@/app/components/common/ui/InputsFilds/SelectPopOver";
import {toast} from "react-toastify";


const EditPop = ({id, typeEdit, typePop, isOpen, closeModal, startTransition, setPending}: {
    id: number,
    typeEdit: "input" | "output",
    typePop: string,
    isOpen: boolean,
    closeModal: any,
    startTransition: any,
    setPending: any
}) => {
    const [oop, setOop] = useState("انتاج")
    let rot = useRouter()
    const handleSubmit = async (data: any) => {
        if (typeEdit == "output") {
            return await OutputService.make<OutputService>().update(id, data).then((res) => {
                    setPending(true);
                    startTransition(rot.refresh);
                    setPending(false);
                    closeModal()
                    toast.success("success", {theme: "dark"});

                    return res
                }
            )
        } else {
            return await InputService.make<InputService>().update(id, (typePop == "oop" ? {oop: oop} : data)).then((res) => {
                    setPending(true);
                    startTransition(rot.refresh);
                    setPending(false);
                    closeModal()
                    toast.success("success", {theme: "dark"});

                    return res
                }
            )
        }
    }

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
                                <Form handleSubmit={handleSubmit}>
                                    {typePop == "date" ?
                                        <DatePicker name={'date'} label={"Date"}/>
                                        : typePop == "oop" ?
                                            <SelectPopOver handleSelect={(e: string) => setOop(e)} label={"Oop : "}
                                                           id={1} status={oop} ArraySelect={["انتاج", "مرتجع"]}/>
                                            :
                                            <Input label={`${typePop} :`} name={typePop} role={`${typePop} in required`}
                                                   type={typePop == "client" || typePop == "sender" ? "text" : "number"}/>}
                                </Form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default EditPop