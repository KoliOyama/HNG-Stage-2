import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const FilterDropdown = ({ selectedFilters, onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const statuses = ['draft', 'pending', 'paid'];

    const toggleDropdown = () => setIsOpen(!isOpen);

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

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={toggleDropdown}
                className="flex items-center gap-3 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-interactive-primary rounded-md p-1"
                aria-expanded={isOpen}
            >
                <span className="text-h-s-variant text-content-primary">
                    Filter <span className="hidden md:inline">by status</span>
                </span>
                <ChevronDownIcon className={`w-3 h-3 text-interactive-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 right-1/2 translate-x-1/2 md:translate-x-0 md:right-0 bg-surface-card rounded-lg shadow-variant p-3 w-[192px] z-20 transition-all">
                    <fieldset className="flex flex-col gap-2">
                        <legend className="sr-only">Filter invoices by status</legend>
                        {statuses.map((status) => (
                            <label 
                                key={status} 
                                className="flex items-center gap-3 group cursor-pointer"
                            >
                                {/* Hidden but accessible native checkbox */}
                                <input 
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={selectedFilters.includes(status)}
                                    onChange={() => onFilterChange(status)}
                                />
                                
                                {/* Custom styled checkbox box */}
                                <div className={`w-2 h-2 rounded-sm border-2 border-transparent transition-all flex items-center justify-center
                                    peer-focus-visible:ring-2 peer-focus-visible:ring-interactive-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-card
                                    ${selectedFilters.includes(status) 
                                        ? 'bg-interactive-primary' 
                                        : 'bg-input-border group-hover:border-interactive-primary'}
                                `}>
                                    {selectedFilters.includes(status) && (
                                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.5 4.5L3.83333 6.83333L8.5 2.16667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    )}
                                </div>

                                <span className="text-h-s-variant text-content-primary capitalize select-none">
                                    {status}
                                </span>
                            </label>
                        ))}
                    </fieldset>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
