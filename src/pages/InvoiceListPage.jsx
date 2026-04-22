import React from 'react';
import InvoiceListHeader from '@/components/InvoiceListHeader';
import InvoiceCard from '@/components/InvoiceCard';
import { EmptyState } from '@/components/EmptyState';
import data from '@/data.json';

const InvoiceListPage = () => {
    const [selectedFilters, setSelectedFilters] = React.useState([]);

    const handleFilterChange = (status) => {
        setSelectedFilters(prev => 
            prev.includes(status) 
                ? prev.filter(s => s !== status) 
                : [...prev, status]
        );
    };

    const filteredInvoices = selectedFilters.length > 0 
        ? data.filter(invoice => selectedFilters.includes(invoice.status))
        : data;

    const hasInvoices = filteredInvoices.length > 0;

    return (
        <section className='flex flex-col gap-4 md:gap-14 lg:gap-16'>
            <InvoiceListHeader 
                count={filteredInvoices.length} 
                selectedFilters={selectedFilters} 
                onFilterChange={handleFilterChange} 
            />
            
            <div className="flex flex-col gap-2">
                {hasInvoices ? (
                    filteredInvoices.map((invoice) => (
                        <InvoiceCard key={invoice.id} invoice={invoice} />
                    ))
                ) : (
                    <EmptyState />
                )}
            </div>
        </section>
    );
};

export default InvoiceListPage;

