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
                ${Icon ? 'pl-2 pr-6 md:pr-8 gap-2 md:gap-4' : 'px-6'} 
                ${className} group
            `} 
            onClick={onClick}
            {...props}
        >
            {/* Render icon if provided. Handles both image paths and React components. */}
            {Icon && (
                <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full transition-all group-hover:rotate-90">
                    {typeof Icon === 'string' ? (
                        <img src={Icon} alt="" className="w-[16px] h-[16px]" />
                    ) : (
                        <Icon className="w-[16px] h-[16px] text-interactive-primary" />
                    )}
                </span>
            )}
            <span className="whitespace-nowrap">
                {children}
            </span>
        </button>
    );
};

export default Button;
