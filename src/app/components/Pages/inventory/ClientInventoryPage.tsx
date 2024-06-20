'use client'

import PageCard from "@/app/components/common/ui/PageCard";
import {Inventory} from "@/services/module/Inventory";
import DeleteIcon from "@/app/components/common/icons/DeleteIcon";
import Link from "next/link";
import {isArray} from "util";

const ClientInventoryPage = ({inventory}: { inventory: Inventory[] }) => {


    return (
        <PageCard>
            <h1 className={'card-title'}>Inventory :</h1>
            <div className="w-full overflow-x-auto rounded-xl">
                <table className="table min-w-[730px]">
                    <thead>
                    <tr className={'bg-gray-300'}>
                        <th>id</th>
                        <th>date</th>
                        <th>Note</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        isArray(inventory)?inventory.map((e: Inventory, index: number) => (
                            <tr key={index} className={'bg-gray-300  '}>
                                <td><p className={'my-2   rounded-xl text-center p-2 '}>{e.id}</p></td>
                                <td><p

                                    className={'my-2 bg-sky-400/50 hover:bg-gray-200 cursor-pointer rounded-xl whitespace-nowrap text-center p-2'}>
                                    <Link href={`/pages/show-inventory/${e.id}`}>
                                        {e.date}
                                    </Link>
                                </p>
                                </td>
                                <td><p className={'my-2 badge-warning overflow-hidden  rounded-xl whitespace-nowrap text-center p-2'}>{e.note}</p></td>
                                <td>
                                    <button type={'button'}   className={`w-fit p-2 group hover:bg-red-300 cursor-pointer rounded-full `}>
                                        <DeleteIcon className={`h-8 w-8 fill-red-400 group-hover:fill-black "fill-red-400"`}/>
                                    </button>
                                </td>
                            </tr>
                        )):""
                    }

                    </tbody>
                </table>
            </div>
        </PageCard>
    )
}

export default ClientInventoryPage