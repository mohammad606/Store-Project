"use client";
import React, { useEffect, useRef, useState,ChangeEvent, HTMLProps, ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { useInfiniteQuery } from "@tanstack/react-query";
import LoadingSpin from "@/app/components/common/icons/LodingSpan";
import {ApiResponse, getNestedPropertyValue} from "@/services/module/Respons";
import XMarkIcon from "@/app/components/common/icons/XMarkIcon";
import ChevronDown from "@/app/components/common/icons/ChevronDown";
export interface Option {
    label: any;
    value: any;
}

export interface SelectInputProps
    extends Omit<
        HTMLProps<HTMLInputElement>,
        "name" | "className" | "value" | "onInput" | "ref" | "onChange"
    > {}

export interface IApiSelectProps<TResponse, TData> {
    required?: boolean;
    type?:string|undefined
    api: (
        page?: number,
        search?: string,
        isLast?: boolean,
        totalPages?: number,
    ) => Promise<ApiResponse<TResponse>>;
    isMultiple?: boolean;
    optionLabel?: keyof TData;
    optionValue?: keyof TData;
    getDataArray?: (response: ApiResponse<TResponse>) => TData[];
    getOptionLabel?: (item: TData) => TData | any;
    getOptionValue?: (item: TData) => TData | any;
    onSelect?: (
        selectedItem?: TData,
        selected?: Option[],
        setSelected?: React.Dispatch<React.SetStateAction<Option[]>>,
        event?: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => void;
    defaultValues?: TData[] | Option[];
    placeHolder?: string;
    label?: string;
    name: string;
    closeOnSelect?: boolean;
    clearable?: boolean;
    styles?: {
        labelClasses?: string;
        selectedItemsBadgeClasses?: string;
        searchInputClasses?: string;
        loadingIcon?: () => ReactNode;
        selectedDropDownItemClasses?: string;
        dropDownItemClasses?: string;
        selectClasses?: string;
        dropDownItemsContainerClasses?: string;
        dropDownContainerMaxHeight?: number;
    };
    onChange?: (e: ChangeEvent) => void;
    inputProps?: SelectInputProps;
    revalidateOnOpen?: boolean;
    getNextPage?: (
        prevPage: number,
        isLast: boolean,
        totalPages: number,
    ) => number;
    onClear?: () => void;
}

export interface ISelectProps<TData> {
    data: TData[];
    isMultiple?: boolean;
    optionLabel?: keyof TData;
    optionValue?: keyof TData;
    getOptionLabel?: (item: TData) => TData | any;
    getOptionValue?: (item: TData) => TData | any;
    onSelect?: (
        selectedItem?: TData,
        selected?: Option[],
        setSelected?: React.Dispatch<React.SetStateAction<Option[]>>,
        event?: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => void;
    defaultValues?: TData[] | Option[];
    placeHolder?: string;
    label?: string;
    name?: string;
    closeOnSelect?: boolean;
    clearable?: boolean;
    styles?: {
        labelClasses?: string;
        selectedItemsBadgeClasses?: string;
        searchInputClasses?: string;
        loadingIcon?: () => ReactNode;
        selectedDropDownItemClasses?: string;
        dropDownItemClasses?: string;
        selectClasses?: string;
        dropDownItemsContainer?: string;
        dropDownContainerMaxHeight?: number;
    };
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    inputProps?: SelectInputProps;
}

export const isEqual = (option1: Option, option2: Option): boolean =>
    (option1.label ?? undefined) == (option2.label ?? undefined) &&
    (option1.value ?? undefined) == (option2.value ?? undefined);

export const include = (option: Option, selected: Option[]): boolean =>
    selected.filter((op) => isEqual(op, option)).length > 0;

export const isOption = (object: any): object is Option =>
    "label" in object && "value" in object;


function ApiSelect<TResponse, TData>({
                                         api,
                                         getDataArray,
                                         label,
                                         clearable = true,
                                         styles = undefined,
                                         name,
                                         isMultiple = false,
                                         closeOnSelect = true,
                                         optionLabel = undefined,
                                         optionValue = undefined,
                                         getOptionLabel = undefined,
                                         getOptionValue = undefined,
                                         onSelect = undefined,
                                         placeHolder = "Select",
                                         defaultValues = undefined,
                                         onChange = undefined,
                                         required = false,
                                         onClear = undefined,
                                         inputProps = {},
                                         type=undefined
                                     }: IApiSelectProps<TResponse, TData>) {
    const {
        setValue,
        formState: { errors },
    } = useFormContext();
    const validationError = getNestedPropertyValue(errors, `${name}.message`);

    const getOption = (item: TData): Option => ({
        label: getOptionLabel
            ? getOptionLabel(item)
            : getNestedPropertyValue(item, String(optionLabel)) ?? undefined,
        value: getOptionValue
            ? getOptionValue(item)
            : getNestedPropertyValue(item, String(optionValue)) ?? undefined,
    });

    let df: Option[] = [];

    if (defaultValues) {
        df = defaultValues.map((val) => {
            if (isOption(val)) {
                return val;
            } else return getOption(val);
        });
    }

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<{ label: any; value: any }[]>(df);
    const [search, setSearch] = useState<any | undefined>(undefined);
    const inputRef = useRef<HTMLInputElement>(null);
    const fullContainer = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
        queryKey: [`tableData_${label}`, search],
        queryFn: async ({ pageParam }) => {
            return await api(pageParam);
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return null;
        },
        staleTime: Infinity,
    });

    const handleClickOutside = (event: MouseEvent) => {
        if (
            fullContainer.current &&
            !fullContainer.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    const handleChoseItem = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        item: TData
    ) => {
        e.stopPropagation();

        if (onSelect) {
            onSelect(item, selected, setSelected, e);
        }
        const option = getOption(item);
        if (isMultiple) {
            if (include(option, selected)) {
                setSelected((prev) => prev.filter((sel) => !isEqual(sel, option)));
            } else {
                setSelected((prev) => [option, ...prev]);
            }
        } else {
            if (include(option, selected)) {
                setSelected([]);
            } else {
                setSelected([option]);
            }
        }

        if (closeOnSelect) {
            setIsOpen(false);
        }
    };

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
        if (!isOpen) {
            if (search) {
                setSearch(undefined);
            }
        }
    };


    const handleClickingOnSearchInput = (
        e: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) => {
        e.stopPropagation();
        setIsOpen(true);
    };

    const handleRemoveFromSelected = (
        e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
        clickedItem: Option
    ) => {
        e.stopPropagation();
        setSelected((prev) => prev.filter((i) => !isEqual(i, clickedItem)));
    };

    const handleDataScrolling = (e: any) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (scrollHeight - scrollTop === clientHeight && hasNextPage) {
            fetchNextPage();
        }
    };

    useEffect(() => {
        inputRef?.current?.dispatchEvent(new Event("input", { bubbles: true }));
    }, [selected]);

    useEffect(() => {
        if (isOpen) {
            searchInputRef.current?.focus();
            document.addEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    const getInputValue = () => {
        if (isMultiple) {
            return selected.map((option) => option.value);
        } else {
            return selected?.[0]?.value ?? "";
        }
    };

    return (
        <div className="relative w-full select-none" ref={fullContainer}>
            <label
                className={`flex ${styles?.labelClasses ?? "label font-medium justify-start select-text"}`}
            >
                {label ?? ""}
                {required ? <span className="ml-1 text-red-600">*</span> : false}
                <input
                    ref={inputRef}
                    name={name ?? ""}
                    value={getInputValue()}
                    className={`hidden`}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (onChange) {
                            onChange(e);
                        }
                        if (name) {
                            setValue(name, getInputValue());
                        }
                    }}
                    {...inputProps}
                />
            </label>

            <div
                onClick={() => handleOpen()}
                className={`flex justify-between cursor-pointer ${styles?.selectClasses ?? "border-gray-300 p-3 border rounded-sm w-full text-gray-700 sm:text-sm"}`}
            >
                <div
                    className="flex justify-between items-center w-full"
                    role="listbox"
                    aria-expanded={isOpen}
                    aria-activedescendant={
                        selected.length ? selected[0].value : undefined
                    }
                >
                    {selected.length > 0 ? (
                        <div className="flex flex-wrap items-center gap-1">
                            {selected.map((option, index) => (
                                <div className="flex flex-wrap gap-1" key={index}>
                  <span
                      className={`${styles?.selectedItemsBadgeClasses ?? "badge badge-ghost hover:badge-warning"} cursor-pointer`}
                  >
                    {option.label}
                  </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>{placeHolder}</p>
                    )}
                    <div className="flex items-center gap-2">
                        {isFetching && (
                            <div className="">
                                {styles?.loadingIcon ? (
                                    styles.loadingIcon()
                                ) : (
                                    <LoadingSpin className="w-full h-full text-pom" />
                                )}
                            </div>
                        )}

                        <ChevronDown className="w-5 h-5 font-extrabold hover:text-gray-600" />
                    </div>
                </div>
                <div
                    className={
                        isOpen
                            ? `absolute overflow-y-scroll left-0 z-50 ${styles?.dropDownItemsContainerClasses ?? " px-3 pb-3 rounded-lg border border-gray-200 shadow-2xl bg-white w-full"}`
                            : "hidden"
                    }
                    style={{
                        top: `${(fullContainer?.current?.clientHeight ?? 0) + 5}px`,
                        maxHeight: `${styles?.dropDownContainerMaxHeight ?? "200"}px`,
                    }}
                    onScroll={(e) => handleDataScrolling(e)}
                    onTouchMove={(e) => handleDataScrolling(e)}
                >


                    {data?.pages?.map((res) => {
                        const items = getDataArray
                            ? getDataArray(res) ?? []
                            : (res.data as TData[]);
                        return items?.map((item, index) => (
                            <div
                                key={index}
                                className={`
                              ${
                                    include(getOption(item), selected)
                                        ? `${styles?.selectedDropDownItemClasses ?? "bg-pom border-pom"}`
                                        : ""
                                }
                              ${styles?.dropDownItemClasses ?? "cursor-pointer hover:border-pom hover:bg-pom my-1 p-2 rounded-md w-full text-black"}`}
                                onClick={(e) => handleChoseItem(e, item)}
                            >
                                {getOption(item).label ?? ""}
                            </div>
                        ));
                    })}

                    {isFetching && (
                        <div className="flex justify-center items-center my-2 w-full">
                            Loading ...
                        </div>
                    )}
                </div>
            </div>
            {validationError ? <p className="text-error">{validationError}</p> : ""}
        </div>
    );
}



export default ApiSelect;