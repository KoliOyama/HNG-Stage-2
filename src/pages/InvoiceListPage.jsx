import React from 'react';
import InvoiceListHeader from '@/components/InvoiceListHeader';
import InvoiceCard from '@/components/InvoiceCard';
import { EmptyState } from '@/components/EmptyState';
import data from '@/data.json';

const InvoiceListPage = () => {
    const hasInvoices = data.length > 0;

    return (
        <section className='flex flex-col gap-4 md:gap-14 lg:gap-16'>
            <InvoiceListHeader />
            
            <div className="flex flex-col gap-2">
                {hasInvoices ? (
                    data.map((invoice) => (
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

