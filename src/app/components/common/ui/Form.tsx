"use client";
import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {ApiResponse} from "@/services/module/Respons";
import {toast} from "react-toastify";
import LoadingSpin from "@/app/components/common/icons/LodingSpan";

const Form = ({
                  children,
                  handleSubmit,
                  onSuccess,
                  defaultValues = {},
                  buttonText = "Submit",
                  messageSuccess = "Success Added"
              }: {
    children: React.ReactNode;
    handleSubmit: (data: any) => Promise<ApiResponse<any>>;
    defaultValues?: object | undefined | null;
    onSuccess?: (res: ApiResponse<any>) => void;
    buttonText?: string;
    messageSuccess?: string
}) => {
    // @ts-ignore
    const methods = useForm({defaultValues: defaultValues});

    const onSubmit = async (data: any) => {
        const res = await handleSubmit(data);

        if (res?.code == 200) {
            toast.success((messageSuccess) ?? "success");
            if (onSuccess) onSuccess(res);
        } else {
            return "Error Fields"
        }
        return res;
    };


    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                encType="multipart/form-data"
            >

                {children}
                <div
                    className="flex justify-center items-center my-5"
                    onClick={() => {
                        methods.clearErrors();
                    }}
                >
                    <button type="submit"
                            disabled={methods.formState.isSubmitting} className="btn btn-accent"> {buttonText}{" "}
                        {methods.formState.isSubmitting ? (
                            <span className="mx-1">
                <LoadingSpin className="w-6 h-6 text-white"/>
              </span>
                        ) : (
                            ""
                        )}</button>
                </div>
            </form>
        </FormProvider>
    );
};

export default Form;