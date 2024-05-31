import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useState} from 'react'
import PageCard from "@/app/components/PageCard";
import ClearIcon from "@/app/components/icons/ClearIcon";
import XMarkIcon from "@/app/components/icons/XMarkIcon";
import Form from "@/app/components/LayoutForms/Form";
import Input from "@/app/components/LayoutForms/InputsFilds/Input";
import DatePicker from "@/app/components/LayoutForms/InputsFilds/DatePicker";
import ApiSelect from "@/app/components/LayoutForms/InputsFilds/ApiSelector";
import {StoreService} from "@/services/seviceDirect/StoreService";
import {Store} from "@/services/module/Store";
import DeleteIcon from "@/app/components/icons/DeleteIcon";
import {OrderType} from "@/app/components/Pages/Home/FormsOrder/CreateOrderForm";


const AddedItemsForm = ({isOpenAdd, closeModal}: { isOpenAdd: boolean, closeModal: any }) => {
    const [dataSend, setDataSend] = useState<OrderType>({
        sender: "",
        client: "",
        date: "",
        noa: undefined,
        qtn: [],
        items: [],
    })
    const handleSubmit = (data: any) => {

    }
    const handleClearData = () => {

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
                                    className="w-full max-w-md min-w-[50vw] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <PageCard>
                                        <div className="flex justify-between items-center w-full h-12">
                                            <h2 className="card-title">Add Order</h2>

                                            <div className={'flex'}>
                                                <div onClick={handleClearData}
                                                     className='w-fit p-2 hover:bg-gray-300 rounded-full cursor-pointer mr-2'>
                                                    <ClearIcon className={'h-8 w-8 '}/>
                                                </div>
                                                <div onClick={() => closeModal('create')}
                                                     className='w-fit p-2 hover:bg-gray-300 rounded-full cursor-pointer'>
                                                    <XMarkIcon className={'h-8 w-8 '}/>
                                                </div>
                                            </div>
                                        </div>
                                        <Form handleSubmit={handleSubmit} messageSuccess={""} buttonText="Add"
                                              defaultValues={dataSend ?? []}>
                                            <div className={'grid md:grid-cols-2 gap-5 '}>
                                                <div>
                                                    <Input required={true} label={"Noa :"} name={'noa'} type={"number"}
                                                           role={"Qtn Is Required"}/>
                                                    <Input required={true} label={"Client :"} name={'client'}
                                                           type={"text"} role={"Qtn Is Required"}/>
                                                    <Input required={true} label={"Sender :"} name={'sender'}
                                                           type={"text"} role={"Qtn Is Required"}/>
                                                </div>
                                                <div>
                                                    <DatePicker required={true} label={"Date :"} name={'date'}/>
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
                                                    <Input required={true} label={"Qtn :"} name={'qtn'} type={"number"}
                                                           role={"Qtn Is Required"}/>
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
                                                {/*{combinedArray?.map((e,index)=>(*/}
                                                {/*    <tr key={index}>*/}
                                                {/*        <td >{e.item}</td>*/}
                                                {/*        <td>{e.qtn}</td>*/}
                                                {/*        <td onClick={()=>handleDelete(e.id)} ><div className='w-fit p-1 hover:bg-gray-300 rounded-full cursor-pointer'>*/}
                                                {/*            <DeleteIcon className={'h-8 w-8 '}/>*/}
                                                {/*        </div></td>*/}
                                                {/*    </tr>*/}
                                                {/*))}*/}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className='w-full flex justify-center mt-3'>
                                            <button type={'button'} className="btn btn-info">Send Items</button>
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