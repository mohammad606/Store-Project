"use client";
import PageCard from "@/app/components/common/ui/PageCard";
import React, { useState } from "react";
import LogInPage from "@/app/components/Pages/login/LogInPage";

export default function page() {

  return (
      <div

          className="w-full bg-black h-screen flex justify-center items-center"
      >
        <div className="md:w-1/2 max-w-[530px] w-full mx-4">
          <PageCard className={'bg-[#ffffff0d]'}>
            <h1 className="card-title text-white">Login:</h1>
             <LogInPage />
          </PageCard>
        </div>
      </div>
  );
}