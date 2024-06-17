'use client'

import {Store} from "@/services/module/Store";
import PageCard from "@/app/components/PageCard";
import React, {useState, useTransition} from "react";
import DeleteIcon from "@/app/components/icons/DeleteIcon";
import Swal from 'sweetalert2'
import {StoreService} from "@/services/seviceDirect/StoreService";
import {useRouter} from "next/navigation";
import EditStoreButtonBar from "@/app/components/Pages/store/EditStoreButtonBar";

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
                        <th>All Added</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {isMutating?<p>Loading....</p>:store.map((e:Store)=>{
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
                                    {/*<Link href={`showOrder/${e?.item}/order`}*/}
                                    {/*      className='flex justify-center '>*/}
                                    {/*    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="30" viewBox="0 0 48 48">*/}
                                    {/*        <linearGradient id="9iHXMuvV7brSX7hFt~tsna_Rdp3AydLFY2A_gr1" x1="12.066" x2="34.891" y1=".066" y2="22.891" gradientUnits="userSpaceOnUse"><stop offset=".237" stopColor="#3bc9f3"></stop><stop offset=".85" stopColor="#1591d8"></stop></linearGradient><path fill="url(#9iHXMuvV7brSX7hFt~tsna_Rdp3AydLFY2A_gr1)" d="M43,15H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,14.1,44.1,15,43,15z"></path><linearGradient id="9iHXMuvV7brSX7hFt~tsnb_Rdp3AydLFY2A_gr2" x1="12.066" x2="34.891" y1="12.066" y2="34.891" gradientUnits="userSpaceOnUse"><stop offset=".237" stopColor="#3bc9f3"></stop><stop offset=".85" stopColor="#1591d8"></stop></linearGradient><path fill="url(#9iHXMuvV7brSX7hFt~tsnb_Rdp3AydLFY2A_gr2)" d="M43,27H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,26.1,44.1,27,43,27z"></path><linearGradient id="9iHXMuvV7brSX7hFt~tsnc_Rdp3AydLFY2A_gr3" x1="12.066" x2="34.891" y1="24.066" y2="46.891" gradientUnits="userSpaceOnUse"><stop offset=".237" stopColor="#3bc9f3"></stop><stop offset=".85" stopColor="#1591d8"></stop></linearGradient><path fill="url(#9iHXMuvV7brSX7hFt~tsnc_Rdp3AydLFY2A_gr3)" d="M43,39H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,38.1,44.1,39,43,39z"></path>*/}
                                    {/*    </svg>*/}
                                    {/*</Link>*/}
                                </td>
                                <td className='w-[14.2%]'>
                                    {/*<Link href={`showOrder/${e?.item}/input`}*/}
                                    {/*      className='flex justify-center'>*/}
                                    {/*    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="30" viewBox="0,0,256,256">*/}
                                    {/*        <defs><linearGradient x1="12.066" y1="0.066" x2="34.891" y2="22.891" gradientUnits="userSpaceOnUse" id="color-1_Rdp3AydLFY2A_gr1"><stop offset="0.237" stopColor="#8859f3"></stop><stop offset="0.85" stopColor="#1591d8"></stop></linearGradient><linearGradient x1="12.066" y1="12.066" x2="34.891" y2="34.891" gradientUnits="userSpaceOnUse" id="color-2_Rdp3AydLFY2A_gr2"><stop offset="0.237" stopColor="#8859f3"></stop><stop offset="0.85" stopColor="#1591d8"></stop></linearGradient><linearGradient x1="12.066" y1="24.066" x2="34.891" y2="46.891" gradientUnits="userSpaceOnUse" id="color-3_Rdp3AydLFY2A_gr3"><stop offset="0.237" stopColor="#8859f3"></stop><stop offset="0.85" stopColor="#1591d8"></stop></linearGradient></defs><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><g transform="scale(5.33333,5.33333)"><path d="M43,15h-38c-1.1,0 -2,-0.9 -2,-2v-2c0,-1.1 0.9,-2 2,-2h38c1.1,0 2,0.9 2,2v2c0,1.1 -0.9,2 -2,2z" fill="url(#color-1_Rdp3AydLFY2A_gr1)"></path><path d="M43,27h-38c-1.1,0 -2,-0.9 -2,-2v-2c0,-1.1 0.9,-2 2,-2h38c1.1,0 2,0.9 2,2v2c0,1.1 -0.9,2 -2,2z" fill="url(#color-2_Rdp3AydLFY2A_gr2)"></path><path d="M43,39h-38c-1.1,0 -2,-0.9 -2,-2v-2c0,-1.1 0.9,-2 2,-2h38c1.1,0 2,0.9 2,2v2c0,1.1 -0.9,2 -2,2z" fill="url(#color-3_Rdp3AydLFY2A_gr3)"></path></g></g>*/}
                                    {/*    </svg>*/}
                                    {/*</Link>*/}
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