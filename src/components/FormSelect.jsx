import React, { useState, useRef, useEffect } from 'react';
import { useField } from 'formik';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const FormSelect = ({ label, options, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const { setValue } = helpers;

    const hasError = meta.touched && meta.error;

    // Find current label based on value
    const selectedOption = options.find(opt => opt.value === field.value);
    const displayValue = selectedOption ? selectedOption.label : '';

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (value) => {
        setValue(value);
        setIsOpen(false);
        // Refocus trigger button after selection
        if (buttonRef.current) {
            buttonRef.current.focus();
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Keyboard navigation
    const handleKeyDown = (event, value) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (value !== undefined) {
                handleSelect(value);
            } else {
                toggleDropdown();
            }
        }
    };

    return (
        <div className="flex flex-col gap-2 w-full relative" ref={dropdownRef}>
            <label 
                htmlFor={props.id || props.name}
                className={`text-body-m transition-colors ${hasError ? 'text-interactive-danger' : 'text-content-secondary'}`}
            >
                {label}
            </label>
            
            <div className="relative">
                <button
                    ref={buttonRef}
                    {...props}
                    type="button"
                    id={props.id || props.name}
                    onClick={toggleDropdown}
                    onKeyDown={(e) => handleKeyDown(e)}
                    className={`
                        w-full h-12 px-5 rounded-[4px] border outline-none transition-all font-bold text-h-s-variant text-content-primary bg-input-bg flex items-center justify-between cursor-pointer
                        ${hasError ? 'border-interactive-danger' : 'border-input-border focus:border-interactive-primary'}
                        ${isOpen ? 'border-interactive-primary' : ''}
                        ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    <span>{displayValue}</span>
                    <ChevronDownIcon className={`w-4 h-4 text-interactive-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <ul 
                        className="absolute top-full left-0 right-0 mt-2 bg-surface-card rounded-lg shadow-variant z-50 overflow-hidden divide-y divide-input-border"
                        role="listbox"
                    >
                        {options.map((option) => (
                            <li 
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                onKeyDown={(e) => handleKeyDown(e, option.value)}
                                tabIndex={0}
                                role="option"
                                aria-selected={field.value === option.value}
                                className={`
                                    px-5 py-4 text-h-s-variant cursor-pointer transition-colors outline-none
                                    ${field.value === option.value ? 'text-interactive-primary' : 'text-content-primary'}
                                    hover:text-interactive-primary focus:text-interactive-primary focus:bg-input-bg
                                `}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            
            {hasError && (
                <span className="text-[10px] font-bold text-interactive-danger absolute -bottom-5 right-0">
                    {meta.error}
                </span>
            )}
        </div>
    );
};

export default FormSelect;
