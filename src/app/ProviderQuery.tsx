"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {useState} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Providers = ({ children }: { children: React.ReactNode }) => {
    const [client] = useState(new QueryClient())
    return (
        <QueryClientProvider client={client}>
            <ToastContainer />
            {children}
        </QueryClientProvider>
    );
};
export default Providers;