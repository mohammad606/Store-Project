"use client";
import React, {HTMLProps, useState} from "react";
import {useFormContext} from "react-hook-form";
import {getNestedPropertyValue} from "@/services/module/Respons";


export interface InputProps extends HTMLProps<HTMLInputElement> {
    className?: string | undefined;
    name: string;
    label?: string;
    labelClass?:string
    type: string;
    required?: boolean;
    setWatch?: React.Dispatch<number>;
    unit?: "IQD" | "day" | "week" | "month" | "hour" | "sec" | "min" | "%" | undefined;
    role:string;
    min?: number;
}

const Input: React.FC<InputProps> = ({
                                         labelClass,
                                         className,
                                         label,
                                         name,
                                         type,
                                         required = false,
                                         setWatch,
                                         unit,
                                         min = 0,
                                         role,
                                         ...props
                                     }) => {
    const {
        register,
        watch,
        formState: {errors},
    } = useFormContext();
    if (setWatch) {
        setWatch(watch(name));
    }
    const [hidden, setHidden] = useState(true);
   const ArrayErrors = Object.entries(errors)
    const CheackError = ArrayErrors.length !=0?Object.entries(errors).map((error)=>{
            return !!(error[0] == name && error[1]?.message);
        }):false
    if (type == "password") {
        return (
            <div className={`flex flex-col items-start w-full`}>
                {label ? (
                    <label className={"label w-fit"}>
                        {label}
                        {unit ? (
                            <span className="ml-1 ">
                (<span className="text-green-500">{unit}</span>)
              </span>
                        ) : (
                            ""
                        )}
                        {required ? <span className="ml-1 text-red-600">*</span> : false}
                    </label>
                ) : (
                    ""
                )}
                <div className={"relative w-full"}>
                    <input
                        {...props}
                        {...register(`${name}`, {
                            required:role
                        })}
                        className={
                            className ??
                            `input input-bordered w-full ${CheackError ? "!border-error " : ""} focus:outline-pom focus:border-pom`
                        }
                        type={!hidden ? "text" : "password"}
                    />
                </div>

                {errors?Object.entries(errors).map((error,index)=>{
                    if(error[0] == name){

                        return (
                            // @ts-ignore
                            <p key={index} className={`text-error text-sm mt-1 pl-2`}>{error[1]?.message}</p>
                        )
                    }
                }):""}
            </div>
        );
    } else
        return (
            <div
                className={`flex ${type == `radio` ? `` : "flex-col"} items-start w-full`}
            >
                {label ? (
                    <label className={`label ${labelClass}`}>
                        {label}
                        {unit ? (
                            <span className="ml-1 ">
                (<span className="text-green-500">{unit}</span>)
              </span>
                        ) : (
                            ""
                        )}
                        {required ? <span className="ml-1 text-red-600">*</span> : false}
                    </label>
                ) : (
                    ""
                )}
                <input
                    {...props}
                    {...register(`${name}`, {
                        required:role
                    })}
                    className={
                        className ??
                        `input input-bordered w-full  ${CheackError ? "border-error" : ""} focus:outline-pom focus:border-pom`
                    }
                    min={min}
                    type={type == "password" && hidden ? "password" : type}
                    step={"any"}
                />
                {errors?Object.entries(errors).map((error,index)=>{
                    if(error[0] == name){

                        return (
                            // @ts-ignore
                            <p key={index} className={`text-error text-sm mt-1 pl-2`}>{error[1]?.message}</p>
                        )
                    }
                }):""}
            </div>
        );
};

export default Input;