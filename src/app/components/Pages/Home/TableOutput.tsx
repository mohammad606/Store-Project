'use client'
import {Output} from "@/services/module/Output";
import DeleteIcon from "@/app/components/icons/DeleteIcon";
import EditIcon from "@/app/components/icons/EditIcon";
import Swal from "sweetalert2";
import HandleRemoveOrder from "@/app/hook/HandleRemoveOrders";
import {useQuery} from "@tanstack/react-query";
import {StoreService} from "@/services/seviceDirect/StoreService";
import {useRouter} from "next/navigation";
import {isArray} from "util";


const TableOutput = ({
                         isTransitionStarted,
                         isPending,
                         startTransition,
                         setPending,
                         outLimitData
                    }: {
    outLimitData: Output[],
    isTransitionStarted:any,
    setPending:React.Dispatch<boolean>,
    startTransition:any,
    isPending:boolean,

}) => {
    const isMutating:boolean = isPending || isTransitionStarted;
    const rot = useRouter()

    const dataOut = isArray(outLimitData) && outLimitData.length != 0 ? outLimitData.slice().reverse() : []
    const {data} = useQuery({
        queryKey:['RemoveFromStore'],
        queryFn:async ()=>{
            return await StoreService.make<StoreService>().ReadDataBase()
        }
    })
    const HandleDeleteData = (id:number,items:string[],qtn:number[])=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't Remove These!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                HandleRemoveOrder(data?.data??[],dataOut,id,items,qtn,'order')
                setPending(true);
                startTransition(rot.refresh);
                setPending(false);
            }
        });

    }


    return (

        <div className="w-full overflow-x-auto rounded-xl">
            <table className="table min-w-[730px]">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Items</th>
                    <th>Qtn</th>
                    <th>Date</th>
                    <th>Client</th>
                    <th>Sender</th>
                    <th>Noa</th>
                    <th>All Qtn</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {isMutating?<p>Loading....</p>:dataOut?.map((order: Output, index: number) => (
                    <tr key={index} className={`${order.delete ? 'bg-error' : 'bg-gray-300'}`}>
                        <td>{order?.id}</td>
                        <td>{order.items.map((item: string, index: number) => (
                            <p className={`my-2 ${order.delete? "bg-black/50 rounded-xl text-white" : "bg-sky-400/50 rounded-xl"} whitespace-nowrap text-center p-2`}
                               key={index}>{item}</p>))}</td>
                        <td>{order.qtn.map((qtn: number, index: number) => (
                            <p className={`my-2 ${order.delete ? "bg-black/50 rounded-xl text-white" : "bg-sky-400/50 rounded-xl"} text-center p-2`}
                               key={index}>{qtn}</p>))}</td>
                        <td>{order.date}</td>
                        <td>{order.client}</td>
                        <td>{order.sender}</td>
                        <td>{order.noa}</td>
                        <td>{order.allQtn}</td>
                        <td>
                            <button type={'button'} disabled={order.delete}  className={`w-fit p-2 group  ${order.delete?"":"hover:bg-red-300 cursor-pointer"} rounded-full `}>
                                <DeleteIcon className={`h-8 w-8 group-hover:fill-black ${order.delete?"fill-black":"fill-red-400"}`}
                                            onClick={()=>{HandleDeleteData(order?.id??0,order.items,order.qtn)}}/>
                            </button>
                        </td>
                        <td>
                            <div className='w-fit p-2  cursor-pointer'>
                                <EditIcon className={'h-8 w-8 '}/>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableOutput