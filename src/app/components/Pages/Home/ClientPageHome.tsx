'use client'
import {Input} from "@/services/module/Input";
import {Output} from "@/services/module/Output";
import TableInput from "@/app/components/Pages/Home/TableInput";
import TableOutput from "@/app/components/Pages/Home/TableOutput";
import PageCard from "@/app/components/common/ui/PageCard";
import { Tab } from "@headlessui/react";
import CreateButtonBar from "@/app/components/Pages/Home/CreateButtonBar";
import {useState, useTransition} from "react";
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
    const [isPending, setPending] = useState<boolean>(false);
    const [isTransitionStarted, startTransition] = useTransition();

    return (
        <div>
            <CreateButtonBar setPending={setPending} startTransition={startTransition}/>
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
                                <TableInput inputLimitData={inputLimitData} isPending={isPending} isTransitionStarted={isTransitionStarted} setPending={setPending} startTransition={startTransition}/>
                            </Tab.Panel>
                            <Tab.Panel className={"w-full"}>
                                <TableOutput outLimitData={outLimitData} isPending={isPending} isTransitionStarted={isTransitionStarted} setPending={setPending} startTransition={startTransition}/>
                            </Tab.Panel>

                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </PageCard>

        </div>
    )
}

export default ClientPageHome