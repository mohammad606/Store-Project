'use client'
import React, {useMemo, useState, useTransition} from 'react';
import {
    useTable,
    useSortBy,
    usePagination,
    useGlobalFilter,
    Column,
    HeaderGroup,
    TableInstance,
} from 'react-table';
import { Output } from '@/services/module/Output';
import DeleteIcon from "@/app/components/icons/DeleteIcon";
import EditIcon from "@/app/components/icons/EditIcon";
import Swal from "sweetalert2";
import HandleRemoveOrder from "@/app/hook/HandleRemoveOrders";
import PageCard from "@/app/components/PageCard";
import TowRowIcon from "@/app/components/icons/TowRowIcon";
import RowIcon from "@/app/components/icons/RowIcon";
import SelectPopOver from "@/app/components/LayoutForms/InputsFilds/SelectPopOver";
import {useQuery} from "@tanstack/react-query";
import {StoreService} from "@/services/seviceDirect/StoreService";
import {useRouter} from "next/navigation";

interface TableComponentProps {
    outLimitData: Output[];
}

const ClientAllOrderPage = ({ outLimitData }: TableComponentProps) => {
    const columns: Column<Output>[] = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Items',
                accessor: 'items',
                Cell: ({ row  }) => (
                    <>
                        {row.original.items.map((item: string, index: number) => (
                            <p className={`my-2 ${row.original.delete? "bg-black/50 rounded-xl text-white" : "bg-sky-400/50 rounded-xl"} whitespace-nowrap text-center p-2`}
                               key={index}>{item}</p>))}
                    </>
                ),
            },
            {
                Header: 'Qtn',
                accessor: 'qtn',
                Cell: ({ row  }) => (
                    <>
                        {row.original.qtn.map((qtn: number, index: number) => (
                            <p className={`my-2 ${row.original.delete ? "bg-black/50 rounded-xl text-white" : "bg-sky-400/50 rounded-xl"} text-center p-2`}
                               key={index}>{qtn}</p>))}
                    </>
                ),
            },
            {
                Header: 'Client',
                accessor: 'client',
            },
            {
                Header: 'Sender',
                accessor: 'sender',
            },
            {
                Header: 'NOA',
                accessor: 'noa',
            },
            {
                Header: 'All QTN',
                accessor: 'allQtn',
            },
            {
                Header: 'Date',
                accessor: 'date',
            },

        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setGlobalFilter,
        state: { pageIndex, pageSize, globalFilter },
    } = useTable<Output>(
        {
            columns,
            data: outLimitData,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    ) as TableInstance<Output>;
    const {data} = useQuery({
        queryKey:['RemoveFromStore'],
        queryFn:async ()=>{
            return await StoreService.make<StoreService>().ReadDataBase()
        }
    })
    let rot = useRouter()
    const [isPending, setPending] = useState<boolean>(false);
    const [isTransitionStarted, startTransition] = useTransition();
    const isMutating:boolean = isPending || isTransitionStarted;

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
                HandleRemoveOrder(data?.data??[],outLimitData,id,items,qtn,'order')
                setPending(true);
                startTransition(rot.refresh);
                setPending(false);
            }
        });

    }
    return (
        <PageCard>
            <div className="flex flex-wrap justify-between items-center w-full h-24">
                <h2 className="card-title whitespace-nowrap">All Orders : </h2>
                <input
                    className={

                        `input input-bordered  focus:outline-pom focus:border-pom max-w-1/2`
                    }
                    value={globalFilter || ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search by Client or NOA..."
                    style={{ marginBottom: '10px' }}
                />
            </div>
            <div className="w-full overflow-x-auto rounded-xl">
                <table {...getTableProps()} className="table min-w-[730px]">
                    <thead>
                    {headerGroups.map((headerGroup: HeaderGroup<Output>) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}

                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </span>
                                </th>

                            ))}
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {isMutating?<p>Loading....</p>:page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                className={`${row.original.delete ?'bg-error' : 'bg-gray-300'}`}
                            >
                                {row.cells.map((cell) => (
                                    <td
                                        {...cell.getCellProps()}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                                <td>
                                    <button type={'button'} disabled={row.original.delete}  className={`w-fit p-2 group  ${row.original.delete?"":"hover:bg-red-300 cursor-pointer"} rounded-full `}>
                                        <DeleteIcon className={`h-8 w-8 group-hover:fill-black ${row.original.delete?"fill-black":"fill-red-400"}`}
                                                    onClick={()=>{HandleDeleteData(row.original?.id??0,row.original.items,row.original.qtn)}}/>
                                    </button>
                                </td>
                                <td>
                                    <div className='w-fit p-2  cursor-pointer'>
                                        <EditIcon className={'h-8 w-8 '}/>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <div  className=' p-1 mt-4 mb-16 flex justify-center py-6 bg-gray-300 rounded-2xl'>

                  <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className='w-10 h-10 mx-2 rounded-2xl badge badge-outline cursor-pointer hover:bg-sky-400/50'>
                      <TowRowIcon className={'w-8 h-8 '}/>
                  </button>{' '}
                  <button onClick={() => previousPage()} disabled={!canPreviousPage} className='w-10 h-10  mx-2 rounded-2xl badge badge-outline cursor-pointer hover:bg-sky-400/50'>
                      <RowIcon className={'w-8 h-8 '}/>
                  </button>{' '}
                  <button onClick={() => nextPage()} disabled={!canNextPage} className='w-10 h-10  mx-2 rounded-2xl badge badge-outline cursor-pointer hover:bg-sky-400/50'>
                      <RowIcon className={'w-8 h-8 rotate-180'}/>
                  </button>{' '}
                  <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className='w-10 h-10  mx-2 rounded-2xl badge badge-outline cursor-pointer hover:bg-sky-400/50'>
                      <TowRowIcon className={'w-8 h-8 rotate-180'}/>
                  </button>{' '}

                <span className={'h-full  mx-2 flex justify-center items-center'}>
                    <p>
                        Page{' '}
                        <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                    </p>
                </span>
                 <div className='max-w-28'>
                     <SelectPopOver status={10} id={1} handleSelect={(e:any)=>{
                         setPageSize(Number(e));
                     }} ArraySelect={[5, 10, 20]}/>
                 </div>

            </div>
        </PageCard>
    );
};

export default ClientAllOrderPage;