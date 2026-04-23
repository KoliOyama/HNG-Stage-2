import React from 'react';
import { useField } from 'formik';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const FormSelect = ({ label, options, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const hasError = meta.touched && meta.error;

    return (
        <div className="flex flex-col gap-2 w-full relative">
            <label 
                htmlFor={props.id || props.name}
                className="text-body-m text-content-secondary"
            >
                {label}
            </label>
            <div className="relative">
                <select
                    {...field}
                    {...props}
                    className={`
                        w-full h-12 px-5 rounded-[4px] border outline-none transition-all font-bold text-h-s-variant text-content-primary bg-input-bg appearance-none cursor-pointer
                        ${hasError ? 'border-interactive-danger' : 'border-input-border focus:border-interactive-primary'}
                    `}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-interactive-primary pointer-events-none" />
            </div>
        </div>
    );
};

export default FormSelect;
