import React from 'react';
import { PlusIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import Button from '@/components/Button';
import data from '@/data.json';

const InvoiceListHeader = () => {
    const invoiceCount = data.length;

    return (
        <header className="flex items-center justify-between">
            <div>
                <h1 className="text-h-m md:text-h-l text-content-primary transition-colors">Invoices</h1>
                <p className="text-body-m text-content-secondary mt-1">
                    {invoiceCount === 0 ? (
                        'No invoices'
                    ) : (
                        <>
                            <span className="hidden md:inline">There are </span>
                            {invoiceCount} total invoices
                        </>
                    )}
                </p>
            </div>

            <div className="flex items-center gap-2 md:gap-10">
                {/* Filter Placeholder */}
                <button className="flex items-center gap-1 group">
                    <span className="text-h-s-variant text-content-primary">
                        Filter <span className="hidden md:inline">by status</span>
                    </span>
                    <ChevronDownIcon className="w-3 h-3 text-interactive-primary transition-transform group-hover:rotate-180" />
                </button>

                {/* New Invoice Button */}
                <Button icon={PlusIcon}>
                    New <span className="hidden md:inline">Invoice</span>
                </Button>
            </div>
        </header>
    );
};

export default InvoiceListHeader;
