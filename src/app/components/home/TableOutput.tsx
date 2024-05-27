'use client'
import {Input} from "@/services/module/Input";
import {Output} from "@/services/module/Output";


const TableOutput = ({
                         outLimitData
                    }: {
    outLimitData: Output[]

}) => {

    const data = outLimitData ? outLimitData.slice().reverse() : []

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
                </tr>
                </thead>
                <tbody>
                {data?.map((data: Output, index: number) => (
                    <tr key={index} className={`${data.delete ? 'badge-warning' : 'bg-gray-300'}`}>
                        <td>{data?.id}</td>
                        <td>{data.items.map((item: string, index: number) => (
                            <p className={`my-2 ${data.delete? "" : "bg-sky-400/50 rounded-xl"} text-center p-2`}
                               key={index}>{item}</p>))}</td>
                        <td>{data.qtn.map((qtn: number, index: number) => (
                            <p className={`my-2 ${data.delete ? "" : "bg-sky-400/50 rounded-xl"} text-center p-2`}
                               key={index}>{qtn}</p>))}</td>
                        <td>{data.date}</td>
                        <td>{data.client}</td>
                        <td>{data.sender}</td>
                        <td>{data.noa}</td>
                        <td>{data.allQtn}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableOutput