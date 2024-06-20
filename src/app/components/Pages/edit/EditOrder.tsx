'use client'
import {Output} from "@/services/module/Output";
import {useState, useTransition} from "react";
import EditPop from "@/app/components/Pages/edit/EditPop";
import EditQtnOrItem from "@/app/components/Pages/edit/EditQtnOrItem";
import {Input} from "@/services/module/Input";
import LoadingSpin from "@/app/components/common/icons/LoadingSpanIcon";

export interface typeItemOrQtn  {
    type:string,
    id:number,
    data:string | number
}

const EditOrder = ({order,pageType}:{order:Output | Input,pageType:"input"|"output"})=>{
    const [isPending, setPending] = useState<boolean>(false);
    const [isTransitionStarted, startTransition] = useTransition();
    const isMutating:boolean = isPending || isTransitionStarted;

    // -----------------------
    let [typeItemOrQtn,setTypeItemOrQtn] = useState<typeItemOrQtn>({
        type:'',
        id:0,
        data:0||""
    })
    let [isOpenItemsOrQtn, setIsOpenItemsOrQtn] = useState(false)
    function closePopItemOrQtn() {
        setIsOpenItemsOrQtn(false)
    }
    // ---------------------------
    let [isOpen, setIsOpen] = useState(false)
    let [typePop,setTypePop] = useState('')

    function closeModal() {
            setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }
    // ----------------------


    return (
        <div className={'w-full px-4  min-h-[92vh]   flex justify-center items-center'}>
            <EditPop id={order.id??0} typeEdit={pageType} typePop={typePop} isOpen={isOpen} closeModal={closeModal} setPending={setPending} startTransition={startTransition}/>
            <EditQtnOrItem typeEdit={pageType} typePop={typeItemOrQtn} order={order} isOpen={isOpenItemsOrQtn} closeModal={closePopItemOrQtn} />
            {isMutating ? <LoadingSpin className={'w-8 h-8'}/> :
                <div className={'md:w-2/3 h-fit w-full mb-24 shadow-2xl shadow-gray-500 bg-gray-400 rounded-2xl'}>
                <div className='w-full h-16 border-b-2 text-white border-white flex justify-between'>
                    <div onClick={() => {
                        setTypePop('noa')
                        return openModal()
                    }}
                         className={'w-1/2 border-r-2  border-white flex justify-center items-center hover:bg-gray-300 cursor-pointer'}>
                        <h2>Noa : <span className={'font-bold text-black'}>{order.noa}</span></h2>
                    </div>
                    <div onClick={() => {
                        setTypePop('date')
                        return openModal()
                    }}
                         className={'w-1/2 flex justify-center items-center hover:bg-gray-300 cursor-pointer'}>
                        <h2>Date : <span className={'font-bold text-black'}>{order.date}</span></h2>
                    </div>
                </div>
                <div className='w-full h-16 border-b-2 text-white border-white  flex justify-between'>
                    <div onClick={() => {
                        setTypePop('client')
                        return openModal()
                    }}
                         className={'w-1/2 border-r-2 border-white flex justify-center items-center hover:bg-gray-300 cursor-pointer'}>
                        <h2>Client : <span className={'font-bold text-black'}>{order.client}</span></h2>
                    </div>
                    <div onClick={() => {
                        setTypePop(pageType == "output" ? "sender" : "oop")
                        return openModal()
                    }} className={'w-1/2 flex justify-center items-center hover:bg-gray-300 cursor-pointer'}>
                        {/*// @ts-ignore*/}
                        <h2>{pageType == "output" ? "Sender" : "Oop"} : <span className={'font-bold text-black'}>{pageType=="output"?order?.sender:order?.oop}</span></h2>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>qtn</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className={'border-0'}>
                            <td>{order.items.map((item: string, index: number) => (
                                <p
                                    onClick={() => {
                                        setTypeItemOrQtn({
                                            type:"item",
                                            id:index,
                                            data:item
                                        })
                                        return setIsOpenItemsOrQtn(true)
                                    }}
                                    className={`my-2  bg-sky-400/50 rounded-xl whitespace-nowrap text-center p-2 hover:bg-warning cursor-pointer`}
                                   key={index}>{item}</p>))}</td>
                            <td>{order.qtn.map((qtn: number, index: number) => (
                                <p onClick={() => {
                                    setTypeItemOrQtn({
                                        type:"qtn",
                                        id:index,
                                        data:qtn
                                    })
                                    return setIsOpenItemsOrQtn(true)
                                }}
                                    className={`my-2  bg-sky-400/50 rounded-xl text-center p-2 hover:bg-warning cursor-pointer`}
                                   key={index}>{qtn}</p>))}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>}

        </div>
    )
}

export default EditOrder