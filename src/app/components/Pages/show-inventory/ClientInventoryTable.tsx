'use client'

import {Store} from "@/services/module/Store";
import PageCard from "@/app/components/common/ui/PageCard";
import React from "react";

const ClientInventoryTable = ({store,date}:{store:Store[],date:string})=>{


    return (
        <PageCard>
            <div className="flex flex-wrap justify-between items-center w-full h-24">
                <h2 className="card-title whitespace-nowrap">All Items In Inventory : {date}</h2>
            </div>

            <div className="w-full overflow-x-auto rounded-xl">
                <table className="table min-w-[730px]">
                    {/* head */}
                    <thead>
                    <tr className='bg-sky-300/50'>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Box</th>
                    </tr>
                    </thead>
                    <tbody>
                    {store.map((e:Store)=>{
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
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </PageCard>
    )
}

export default ClientInventoryTable