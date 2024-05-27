'use client'
import {Input} from "@/services/module/Input";
import {Output} from "@/services/module/Output";
import TableInput from "@/app/components/home/TableInput";
import TableOutput from "@/app/components/home/TableOutput";
import PageCard from "@/app/components/PageCard";
import { Tab } from "@headlessui/react";
function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
const ClientPageHome = ({
                            inputLimitData,
                            outLimitData
                        }:{
    inputLimitData:Input[],
    outLimitData:Output[]
})=>{


    return (
        <>

            <PageCard>
                <div className={"w-full"}>
                    <Tab.Group>
                        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                            <Tab
                                className={({ selected }) =>
                                    classNames(
                                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                                        "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                                        selected
                                            ? "bg-white text-blue-700 shadow"
                                            : "text-blue-500 hover:bg-white/[0.12] hover:text-white",
                                    )
                                }
                            >
                                Input
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    classNames(
                                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                                        "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                                        selected
                                            ? "bg-white text-blue-400 shadow"
                                            : "text-blue-500 hover:bg-white/[0.12] hover:text-white",
                                    )
                                }
                            >
                                Output
                            </Tab>

                        </Tab.List>
                        <Tab.Panels className="mt-2">
                            <Tab.Panel className={"w-full"}>
                                <TableInput inputLimitData={inputLimitData} />
                            </Tab.Panel>
                            <Tab.Panel className={"w-full"}>
                                <TableOutput outLimitData={outLimitData}/>
                            </Tab.Panel>

                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </PageCard>

        </>
    )
}

export default ClientPageHome