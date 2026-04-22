import React from 'react';
import InvoiceListHeader from '@/components/InvoiceListHeader';
import InvoiceCard from '@/components/InvoiceCard';
import data from '@/data.json';

const InvoiceListPage = () => {
    return (
        <section className='flex flex-col gap-4 md:gap-14 lg:gap-16'>
            <InvoiceListHeader />
            
            <div className="flex flex-col gap-2">
                {data.map((invoice) => (
                    <InvoiceCard key={invoice.id} invoice={invoice} />
                ))}
            </div>
        </section>
    );
};

export default InvoiceListPage;
