import React, {SVGProps} from 'react';

interface LogOutIconProps extends SVGProps<SVGSVGElement> {
}

const ProductionProps: React.FC<LogOutIconProps> = (props) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
                  d="M6.25 3.5A1.75 1.75 0 0 0 4.5 5.25v2.5c0 .966.784 1.75 1.75 1.75h2.5a1.75 1.75 0 0 0 1.75-1.75v-2.5A1.75 1.75 0 0 0 8.75 3.5zm7.25 1.75c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 0 1-1.75 1.75h-2.5a1.75 1.75 0 0 1-1.75-1.75zM15.25 5a.25.25 0 0 0-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 0 0 .25-.25v-2.5a.25.25 0 0 0-.25-.25zM7 17.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m6.5-1.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m3.5 1.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16a4.5 4.5 0 0 1 4.5-4.5h11a4.5 4.5 0 1 1 0 9h-11A4.5 4.5 0 0 1 2 16m4.5-3a3 3 0 1 0 0 6h11a3 3 0 1 0 0-6z"></path>
        </svg>

    );
}

export default ProductionProps;