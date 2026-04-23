import React from 'react';
import { useField } from 'formik';

const FormField = ({ label, hideLabelOnDesktop, ...props }) => {
    const [field, meta] = useField(props);
    const hasError = meta.touched && meta.error;

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className={`flex justify-between items-center ${hideLabelOnDesktop ? 'md:hidden' : ''}`}>
                <label 
                    htmlFor={props.id || props.name}
                    className={`text-body-m transition-colors ${hasError ? 'text-interactive-danger' : 'text-content-secondary'}`}
                >
                    {label}
                </label>
                {hasError && (
                    <span className="text-[10px] font-bold text-interactive-danger">
                        {meta.error}
                    </span>
                )}
            </div>
            <input
                {...field}
                {...props}
                className={`
                    w-full h-12 px-5 rounded-[4px] border outline-none transition-all font-bold text-h-s-variant text-content-primary bg-input-bg
                    ${hasError 
                        ? 'border-interactive-danger focus:border-interactive-danger' 
                        : 'border-input-border focus:border-interactive-primary'}
                `}
            />
        </div>
    );
};

export default FormField;
