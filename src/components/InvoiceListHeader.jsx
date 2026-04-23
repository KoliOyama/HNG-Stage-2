import React from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import Button from '@/components/Button';
import FilterDropdown from '@/components/FilterDropdown';

const InvoiceListHeader = ({ count, selectedFilters, onFilterChange, onNewInvoice }) => {
    return (
        <header className="flex items-center justify-between">
            <div>
                <h1 className="text-h-m md:text-h-l text-content-primary transition-colors">Invoices</h1>
                <p className="text-body-m text-content-secondary mt-1">
                    {count === 0 ? (
                        'No invoices'
                    ) : (
                        <>
                            <span className="hidden md:inline">There are </span>
                            {count} total invoices
                        </>
                    )}
                </p>
            </div>

            <div className="flex items-center gap-2 md:gap-10">
                <FilterDropdown 
                    selectedFilters={selectedFilters} 
                    onFilterChange={onFilterChange} 
                />

                {/* New Invoice Button */}
                <Button icon={PlusIcon} onClick={onNewInvoice}>
                    New <span className="hidden md:inline">Invoice</span>
                </Button>
            </div>
        </header>
    );
};

export default InvoiceListHeader;
