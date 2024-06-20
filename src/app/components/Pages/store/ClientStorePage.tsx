'use client'

import {Store} from "@/services/module/Store";
import PageCard from "@/app/components/common/ui/PageCard";
import React, {useState, useTransition} from "react";
import DeleteIcon from "@/app/components/common/icons/DeleteIcon";
import Swal from 'sweetalert2'
import {StoreService} from "@/services/seviceDirect/StoreService";
import {useRouter} from "next/navigation";
import EditStoreButtonBar from "@/app/components/Pages/store/EditStoreButtonBar";
import OrderIcon from "@/app/components/common/icons/OrderIcon";
import Link from "next/link";
import ProductionProps from "@/app/components/common/icons/ProductionIcon";
import {setCookieClient} from "@/actions/clientCookies";
import LoadingSpin from "@/app/components/common/icons/LoadingSpanIcon";

const ClientStorePage = ({store}:{store:Store[]})=>{
    const [isPending, setPending] = useState<boolean>(false);
    const [isTransitionStarted, startTransition] = useTransition();
    const isMutating:boolean = isPending || isTransitionStarted;
    let rot = useRouter()

    const HandleDeleteItemFromStore = (id:number)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't Delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await StoreService.make<StoreService>().delete(id)
                setPending(true);
                startTransition(rot.refresh);
                setPending(false);
            }
        });
    }

    return (
        <PageCard>
            <div className="flex flex-wrap justify-between items-center w-full h-24">
                <h2 className="card-title whitespace-nowrap">All Items : </h2>
            </div>
            <div className={'my-4'}>
                <EditStoreButtonBar startTransition={startTransition} setPending={setPending}/>

            </div>
            <div className="w-full overflow-x-auto rounded-xl">
                <table className="table min-w-[730px]">
                    {/* head */}
                    <thead>
                    <tr className='bg-sky-300/50'>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Box</th>
                        <th>All Order</th>
                        <th>All Production</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {isMutating?<LoadingSpin className={'w-8 h-8'}/>:store.map((e:Store)=>{
                        return(
                            <tr key={e.id} className={` text-center border-b-2 border-white  ${e?.qtn == 0 ? "badge-error":e.qtn < 0 ? " badge-warning" : "bg-gray-300"}`}>
                                <td className='w-[28.5%] text-start pl-2 '>
                                    <p className={`my-2 bg-sky-400/50  rounded-xl whitespace-nowrap text-center p-2`}>
                                        {e.item?e.item:''}
                                    </p>
                                </td>
                                <td className='w-[28.5%] text-start pl-2  '>
                                    <p className={`my-2 bg-sky-400/50  rounded-xl whitespace-nowrap text-center p-2`}>
                                        {e.qtn?e.qtn:0}
                                    </p>
                                </td>
                                <td className='w-[14.2%]  pl-2 vsm:text-[14px] '>
                                    <p className={`my-2 bg-sky-400/50  rounded-xl whitespace-nowrap text-center p-2`}>
                                        {e.qtn < 0 ? 0 : Math.floor(e?.qtn / Number(e?.box))} Plus/ {e.qtn < 0 ? 0 : e?.qtn-Math.floor(e?.qtn / Number(e?.box))*Number(e?.box)}
                                    </p>
                                </td>
                                <td className='w-[14.2%] '>
                                    <div className='w-12 h-12 p-2 group rounded-full hover:bg-sky-400/50 cursor-pointer '
                                      onClick={()=>window.localStorage.setItem('orderItem',e.item)}>
                                        <Link href={`show-order/${e?.id}/order`}>
                                            <OrderIcon className={'w-8 h-8 group-hover:fill-white '}/>
                                        </Link>
                                    </div>
                                </td>
                                <td className='w-[14.2%]'>
                                    <div className='w-12 h-12 p-2 group rounded-full hover:bg-sky-400/50 cursor-pointer '
                                          onClick={()=>window.localStorage.setItem('productionItem',e.item)}>
                                        <Link href={`show-order/${e?.id}/production`}>
                                            <ProductionProps className={'w-8 h-8 group-hover:fill-white '}/>
                                        </Link>
                                    </div>
                                </td>
                                <td className='w-[14.2%] p-2'>
                                    <button type={'button'}   className={`w-fit p-2 group rounded-full hover:bg-red-400 `}>
                                        <DeleteIcon className={`h-8 w-8 group-hover:fill-black  ${e.qtn == 0 ?"fill-black" :"fill-red-400"}`} onClick={()=>{
                                            return HandleDeleteItemFromStore(e.id)
                                        }}/>
                                    </button>


                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </PageCard>
    )
}

export default ClientStorePage