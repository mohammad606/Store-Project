"use client";

import React, {useState} from "react";
import Form from "@/app/components/common/ui/Form";
import Input from "@/app/components/common/ui/InputsFilds/Input";
import singIn from "@/services/AuthService";


const LogInPage = ()=>{



    const handleSubmit = async (data:{email:string,password:string}) => {
        return await singIn(data.email,data.password)
    };


    return (
        // @ts-ignore
        <Form handleSubmit={handleSubmit}>
            <Input labelClass={'text-white'} type={'email'} name={'email'} label={"Email :"} role={"Email is Required"}/>
            <Input labelClass={'text-white'} type={'text'} name={'password'} label={"Password :"}  role={"Password is Required"}/>

        </Form>
    )
}

export default LogInPage