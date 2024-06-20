import React from "react";

const PageCard = ({ children,className }: { children: React.ReactNode ,className?:string}) => {
    return (
        <div className={`relative w-full `}>
            <div className={`card bg-base-100 m-2 shadow-gray-500 shadow-2xl ${className}`}>
                <div className={`card-body`}>{children}</div>
            </div>
        </div>
    );
};

export default PageCard;