import React, {SVGProps} from "react";
interface LogOutIconProps extends SVGProps<SVGSVGElement> {
}
const ChevronDown : React.FC<LogOutIconProps>= ({ className, ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={className}
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
        </svg>
    );
};

export default ChevronDown;