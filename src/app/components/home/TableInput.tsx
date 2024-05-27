'use client'
import {Input} from "@/services/module/Input";


const TableInput = ({
                        inputLimitData
                    }: {
    inputLimitData: Input[]

}) => {

    const data = inputLimitData ? inputLimitData.slice().reverse() : []

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
                </tr>
                </thead>
                <tbody>
                {data?.map((data: Input, index: number) => (
                    <tr key={index} className={`${data.oop == "مرتجع" ? 'badge-warning' : 'bg-gray-300'}`}>
                        <td>{data?.id}</td>
                        <td>{data.items.map((item: string, index: number) => (
                            <p className={`my-2 ${data.oop == "مرتجع" ? "" : "bg-sky-400/50 rounded-xl"} text-center p-2`}
                               key={index}>{item}</p>))}</td>
                        <td>{data.qtn.map((qtn: number, index: number) => (
                            <p className={`my-2 ${data.oop == "مرتجع" ? "" : "bg-sky-400/50 rounded-xl"} text-center p-2`}
                               key={index}>{qtn}</p>))}</td>
                        <td>{data.date}</td>
                        <td>{data.client}</td>
                        <td>{data.noa}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableInput