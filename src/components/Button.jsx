import React from 'react';

const Button = ({ children, variant = 'primary', icon: Icon, onClick, className = '', ...props }) => {
    const variantClasses = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        tertiary: 'btn-tertiary',
        danger: 'btn-danger',
        draft: 'btn-draft'
    };

    return (
        <button 
            className={`
                ${variantClasses[variant]} 
                ${Icon ? 'pl-1 pr-3 md:pr-4 gap-1 md:gap-2' : 'px-3'} 
                ${className} group
            `} 
            onClick={onClick}
            {...props}
        >
            {/* Render icon if provided. Handles both image paths and React components. */}
            {Icon && (
                <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full transition-all group-hover:rotate-90">
                    {typeof Icon === 'string' ? (
                        <img src={Icon} alt="" className="w-[24px] h-[24px]" />
                    ) : (
                        <Icon className="w-[24px] h-[24px] text-interactive-primary" />
                    )}
                </span>
            )}
            <span className="flex-1 text-center whitespace-nowrap">
                {children}
            </span>
        </button>
    );
};

export default Button;
