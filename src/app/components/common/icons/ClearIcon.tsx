import React, {SVGProps} from 'react';

interface LogOutIconProps extends SVGProps<SVGSVGElement> {
}

const ClearIcon: React.FC<LogOutIconProps> = (props) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <defs>
                <mask id="ipTClearFormat0">
                    <g fill="none" stroke="#fff">
                        <path fill="#555" strokeLinejoin="round" strokeWidth={4.3}
                              d="M44.782 24.17L31.918 7.1L14.135 20.5L27.5 37l3.356-2.336z"></path>
                        <path strokeLinejoin="round" strokeWidth={4.3}
                              d="m27.5 37l-3.839 3.075l-10.563-.001l-2.6-3.45l-6.433-8.536L14.5 20.225"></path>
                        <path strokeLinecap="round" strokeWidth={4.5} d="M13.206 40.072h31.36"></path>
                    </g>
                </mask>
            </defs>
            <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTClearFormat0)"></path>
        </svg>

    );
}

export default ClearIcon;