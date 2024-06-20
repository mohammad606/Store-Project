import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import PageCard from "@/app/components/common/ui/PageCard";
import ClearIcon from "@/app/components/common/icons/ClearIcon";
import XMarkIcon from "@/app/components/common/icons/XMarkIcon";
import Form from "@/app/components/common/ui/Form";
import Input from "@/app/components/common/ui/InputsFilds/Input";
import DatePicker from "@/app/components/common/ui/InputsFilds/DatePicker";
import ApiSelect from "@/app/components/common/ui/InputsFilds/ApiSelector";
import { StoreService } from "@/services/seviceDirect/StoreService";
import { Store } from "@/services/module/Store";
import DeleteIcon from "@/app/components/common/icons/DeleteIcon";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { HandleAddOrRemoveData } from "@/app/hook/HandleAddOrRemoveData";
import { toast } from "react-toastify";
import { InputService } from "@/services/seviceDirect/InputService";
import SelectPopOver from "@/app/components/common/ui/InputsFilds/SelectPopOver";

export interface AddType {
    client: string,
    date: string,
    noa: number | undefined,
    qtn: number[],
    items: string[],
}

const AddedItemsForm = ({ isOpenAdd, closeModal }: { isOpenAdd: boolean, closeModal: any }) => {
    const [arrayOfItems, setArrayOfItems] = useState<string[]>([])
    const [arrayOfQtn, setArrayOfQtn] = useState<number[]>([])
    const [dataSend, setDataSend] = useState<AddType>({
        client: "",
        date: "",
        noa: undefined,
        qtn: [],
        items: [],
    })

    const handleSubmit = (data: any) => {
        // Check if item is already in the array and not empty
        if (!arrayOfItems.includes(data.item) && data.item !== "") {
            setArrayOfItems([...arrayOfItems, data.item])
            setArrayOfQtn([...arrayOfQtn, Number(data.qtn)])
        } else {
            toast.error("Item already exists or is empty", { theme: "dark" });
            return;
        }

        setDataSend({
            items: [...arrayOfItems, data.item],
            qtn: [...arrayOfQtn, Number(data.qtn)],
            date: data.date,
            noa: data.noa,
            client: data.client,
        })
        return data
    }

    useEffect(() => {
        setDataSend({
            items: arrayOfItems,
            qtn: arrayOfQtn,
            date: dataSend.date,
            noa: dataSend.noa,
            client: dataSend.client,
        })
    }, [arrayOfItems])

    const handleClearData = () => {
        setDataSend({
            client: "",
            date: "",
            noa: undefined,
            qtn: [],
            items: [],
        })
        setArrayOfItems([])
        setArrayOfQtn([])
    }

    const handleDelete = (index: number) => {
        const newItems = arrayOfItems.filter((_, i) => i !== index);
        const newQuantities = arrayOfQtn.filter((_, i) => i !== index);
        setArrayOfItems(newItems);
        setArrayOfQtn(newQuantities);
    };

    let combinedArray = arrayOfItems.map((item: string, index) => {
        return { id: index, item: item, qtn: arrayOfQtn[index] };
    });

    const { data } = useQuery({
        queryFn: async () => {
            return await StoreService.make<StoreService>().ReadDataBase()
        },
        queryKey: ["StoreDataForInput"]
    })

    const [oop, setOop] = useState('انتاج')

    const handleSendData = async () => {
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
                return await InputService.make<InputService>().limitToLast(1).then(async (res) => {
                    const id = res[0] ? res[0].id + 1 : 0
                    const allQtn = dataSend.qtn.reduce((acc, current) => acc + current, 0);
                    const send = {
                        oop: oop,
                        qtn: dataSend.qtn,
                        items: dataSend.items,
                        noa: dataSend.noa,
                        client: dataSend.client,
                        date: dataSend.date,
                        id: id,
                        allQtn: allQtn
                    }
                    return await InputService.make<InputService>().store(id, send).then(() => {
                        HandleAddOrRemoveData(send.items, send.qtn, data?.data, "add")
                        toast.success("success", { theme: "dark" });
                        handleClearData()
                        closeModal('add')
                    })
                })
            }
        });
    }

    return (
        <>
            <Transition appear show={isOpenAdd} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => closeModal('add')}>
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
                                            <h2 className="card-title">Add Items</h2>
                                            <div className={'flex'}>
                                                <div onClick={handleClearData} className='w-fit p-2 hover:bg-gray-300 rounded-full cursor-pointer mr-2'>
                                                    <ClearIcon className={'h-8 w-8 '} />
                                                </div>
                                                <div onClick={() => closeModal('add')} className='w-fit p-2 hover:bg-gray-300 rounded-full cursor-pointer'>
                                                    <XMarkIcon className={'h-8 w-8 '} />
                                                </div>
                                            </div>
                                        </div>
                                        <Form handleSubmit={handleSubmit} messageSuccess={""} buttonText="Add" defaultValues={dataSend ?? []}>
                                            <div className={'grid md:grid-cols-2 gap-5 '}>
                                                <div>
                                                    <SelectPopOver handleSelect={(e: string) => setOop(e)} label={"Oop : "} id={1} status={oop} ArraySelect={["انتاج", "مرتجع"]} />
                                                    <Input required={true} label={"Noa :"} name={'noa'} type={"number"} role={"Qtn Is Required"} />
                                                    {oop == "مرتجع" ? <Input required={true} label={"Client :"} name={'client'} type={"text"} role={"Qtn Is Required"} /> : ""}
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
                                                        getOptionLabel={(data: Store) => (data.item)}
                                                    />
                                                    <Input required={true} label={"Qtn :"} name={'qtn'} type={"number"} role={"Qtn Is Required"} />
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
                                                {combinedArray?.map((e, index) => (
                                                    <tr key={index}>
                                                        <td>{e.item}</td>
                                                        <td>{e.qtn}</td>
                                                        <td onClick={() => handleDelete(e.id)}><div className='w-fit p-1 hover:bg-gray-300 rounded-full cursor-pointer'>
                                                            <DeleteIcon className={'h-8 w-8 '} />
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

export default AddedItemsForm