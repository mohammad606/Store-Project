import React, {SVGProps} from 'react';

interface LogOutIconProps extends SVGProps<SVGSVGElement> {
}

const TowRowIcon: React.FC<LogOutIconProps> = (props) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M17.59 18L19 16.59L14.42 12L19 7.41L17.59 6l-6 6z"></path>
            <path fill="currentColor" d="m11 18l1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z"></path>
        </svg>
    );
}

export default TowRowIcon;