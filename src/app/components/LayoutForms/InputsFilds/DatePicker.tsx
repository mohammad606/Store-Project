import React, {HTMLProps} from "react";
import {useFormContext} from "react-hook-form";
export interface InputProps extends HTMLProps<HTMLInputElement> {
    className?: string | undefined;
    name: string;
    label?: string;
    required?: boolean;
    unit?: "IQD" | "day" | "week" | "month" | "hour" | "sec" | "min" | "%" | undefined;
}

const DatePicker: React.FC<InputProps> = ({name,label,required,className,...props})=>{

    const {
        register,
        formState: {errors},
    } = useFormContext();
    const ArrayErrors = Object.entries(errors)
    const CheackError = ArrayErrors.length !=0?Object.entries(errors).map((error)=>{
        return !!(error[0] == name && error[1]?.message);
    }):false

    return (
        <div
            className={`flex flex-col items-start w-full`}
        >
            {label ? (
                <label className={"label"}>
                    {label}
                    {required ? <span className="ml-1 text-red-600">*</span> : false}
                </label>
            ) : (
                ""
            )}
            <input
                {...props}
                {...register(`${name}`, {
                    required:"Date Is Required"
                })}
                className={
                    className ??
                    `input input-bordered w-full  ${CheackError ? "border-error" : ""} focus:outline-pom focus:border-pom`
                }
                type={"date"}
                step={"any"}
            />
            {errors?Object.entries(errors).map((error)=>{
                if(error[0] == name){
                    return (
                        // @ts-ignore
                        <p className={`text-error text-sm mt-1 pl-2`}>{error[1]?.message}</p>
                    )
                }
            }):""}
        </div>
    )
}

export default DatePicker