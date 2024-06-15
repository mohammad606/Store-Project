import React, {SVGProps} from 'react';

interface LogOutIconProps extends SVGProps<SVGSVGElement> {
}

const RowIcon: React.FC<LogOutIconProps> = (props) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M17.59 18L19 16.59L14.42 12L19 7.41L17.59 6l-6 6z"></path>
        </svg>
    );
}

export default RowIcon;