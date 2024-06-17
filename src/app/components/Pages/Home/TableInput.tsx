'use client'
import {Input} from "@/services/module/Input";
import DeleteIcon from "@/app/components/icons/DeleteIcon";
import EditIcon from "@/app/components/icons/EditIcon";
import HandleRemoveOrder from "@/app/hook/HandleRemoveOrders";
import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {StoreService} from "@/services/seviceDirect/StoreService";
import Swal from 'sweetalert2'
import {isArray} from "util";


const TableInput = ({
                        isTransitionStarted,
                        isPending,
                        startTransition,
                        setPending,
                        inputLimitData
                    }: {
    inputLimitData: Input[]
    isTransitionStarted:any,
    setPending:React.Dispatch<boolean>,
    startTransition:any,
    isPending:boolean,
}) => {

    const isMutating:boolean = isPending || isTransitionStarted;
    let rot = useRouter()
    const {data} = useQuery({
        queryKey:['RemoveFromStore'],
        queryFn:async ()=>{
            return await StoreService.make<StoreService>().ReadDataBase()
        }
    })
    const dataInput = isArray(inputLimitData) && inputLimitData.length != 0 ? inputLimitData.slice().reverse() : []

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
                HandleRemoveOrder(data?.data??[],dataInput,id,items,qtn,'add')
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
                    <th>Noa</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {isMutating?<p>Loading....</p>:dataInput?.map((input: Input, index: number) => (
                    <tr key={index} className={`${input.oop == "مرتجع" && !input.delete ? 'badge-warning' : input.delete ?"bg-error":"bg-gray-300"} `}>
                        <td>{input?.id}</td>
                        <td>{input.items.map((item: string, index: number) => (
                            <p className={`my-2 ${input.oop == "مرتجع" ? " bg-black/50 text-white" : "bg-sky-400/50 "} rounded-xl whitespace-nowrap text-center p-2`}
                               key={index}>{item}</p>))}</td>
                        <td>{input.qtn.map((qtn: number, index: number) => (
                            <p className={`my-2 ${input.oop == "مرتجع" ? " bg-black/50 rounded-xl text-white" : "bg-sky-400/50 rounded-xl"} text-center p-2`}
                               key={index}>{qtn}</p>))}</td>
                        <td>{input.date}</td>
                        <td>{input.client}</td>
                        <td>{input.noa}</td>
                        <td>
                            <button type={'button'} disabled={input.delete}  className={`w-fit p-2 group  ${input.delete?"":"hover:bg-red-300 cursor-pointer"} rounded-full `}>
                                <DeleteIcon className={`h-8 w-8 group-hover:fill-black ${input.delete?"fill-black":"fill-red-400"}`}
                                 onClick={()=>{HandleDeleteData(input?.id??0,input.items,input.qtn)}}/>
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

export default TableInput