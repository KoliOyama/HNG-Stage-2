import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { generateId } from '@/utils/generateId';
import { calculateTotal } from '@/utils/calculateTotal';
import { addDays, format, parseISO } from 'date-fns';
import initialData from '@/data.json';

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
    const [invoices, setInvoices] = useLocalStorage('invoices', initialData);

    // Helper to process invoice data (calculate totals and payment due)
    const processInvoice = (invoiceData) => {
        const items = invoiceData.items.map(item => ({
            ...item,
            total: Number(item.quantity) * Number(item.price)
        }));

        const total = calculateTotal(items);
        
        // Calculate paymentDue: createdAt + paymentTerms
        const createdAtDate = parseISO(invoiceData.createdAt);
        const paymentDue = format(addDays(createdAtDate, Number(invoiceData.paymentTerms)), 'yyyy-MM-dd');

        return {
            ...invoiceData,
            items,
            total,
            paymentDue
        };
    };

    const addInvoice = (invoiceData, isDraft = false) => {
        const newInvoice = {
            ...processInvoice(invoiceData),
            id: generateId(),
            status: isDraft ? 'draft' : 'pending'
        };

        setInvoices(prev => [...prev, newInvoice]);
        return newInvoice;
    };

    const updateInvoice = (id, updatedData) => {
        setInvoices(prev => prev.map(inv => 
            inv.id === id 
                ? { ...inv, ...processInvoice(updatedData) }
                : inv
        ));
    };

    const deleteInvoice = (id) => {
        setInvoices(prev => prev.filter(inv => inv.id !== id));
    };

    const markAsPaid = (id) => {
        setInvoices(prev => prev.map(inv => 
            inv.id === id ? { ...inv, status: 'paid' } : inv
        ));
    };

    const value = useMemo(() => ({
        invoices,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        markAsPaid
    }), [invoices]);

    return (
        <InvoiceContext.Provider value={value}>
            {children}
        </InvoiceContext.Provider>
    );
};

export const useInvoices = () => {
    const context = useContext(InvoiceContext);
    if (!context) {
        throw new Error('useInvoices must be used within an InvoiceProvider');
    }
    return context;
};
