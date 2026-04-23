import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useInvoices } from '@/context/InvoiceContext';
import { formatDate } from '@/utils/formatDate';
import StatusBadge from '@/components/StatusBadge';
import Button from '@/components/Button';
import DeleteModal from '@/components/DeleteModal';
import InvoiceForm from '@/components/InvoiceForm';

const InvoiceDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { invoices, markAsPaid, deleteInvoice } = useInvoices();
    
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);

    const invoice = invoices.find(inv => inv.id === id);

    if (!invoice) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <h1 className="text-h-l text-content-primary">Invoice not found</h1>
                <Link to="/" className="text-h-s-variant text-interactive-primary hover:underline">
                    Back to Invoices
                </Link>
            </div>
        );
    }

    const handleDelete = () => {
        deleteInvoice(invoice.id);
        setIsDeleteModalOpen(false);
        navigate('/');
    };

    const handleMarkAsPaid = () => {
        markAsPaid(invoice.id);
    };

    const isPaid = invoice.status === 'paid';
    const isPending = invoice.status === 'pending';
    const isDraft = invoice.status === 'draft';

    const ActionButtons = ({ className = "" }) => (
        <div className={`flex items-center gap-2 md:gap-3 ${className}`}>
            {!isPaid && (
                <Button variant="tertiary" onClick={() => setIsEditFormOpen(true)}>
                    Edit
                </Button>
            )}
            <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
                Delete
            </Button>
            {isPending && (
                <Button variant="primary" onClick={handleMarkAsPaid}>
                    Mark as Paid
                </Button>
            )}
        </div>
    );

    return (
        <section className="flex flex-col gap-8 pb-32 md:pb-12 lg:pb-0 max-w-[730px] mx-auto w-full animate-fadeIn">
            {/* Back Button */}
            <Link 
                to="/" 
                className="flex items-center gap-6 text-h-s-variant text-content-primary hover:text-content-secondary transition-colors group mb-2"
            >
                <ChevronLeftIcon className="w-4 h-4 text-interactive-primary group-hover:text-interactive-primary-light transition-colors" />
                <span>Go back</span>
            </Link>

            {/* Status Header */}
            <div className="bg-surface-card shadow-card rounded-lg p-6 md:px-8 md:py-5 flex items-center justify-between">
                <div className="flex items-center justify-between w-full md:w-auto md:gap-4">
                    <span className="text-body-m text-content-tertiary">Status</span>
                    <StatusBadge status={invoice.status} />
                </div>
                <ActionButtons className="hidden md:flex" />
            </div>

            {/* Detail Content */}
            <div className="bg-surface-card shadow-card rounded-lg p-6 md:p-8 lg:p-12 flex flex-col gap-8 md:gap-12">
                {/* ID and Address */}
                <div className="flex flex-col md:flex-row md:justify-between gap-8">
                    <div className="flex flex-col gap-1 md:gap-2">
                        <h1 className="text-h-m md:text-h-l text-content-primary">
                            <span className="text-content-secondary">#</span>{invoice.id}
                        </h1>
                        <span className="text-body-m text-content-secondary">{invoice.description}</span>
                    </div>
                    <address className="not-italic text-body-m text-content-secondary flex flex-col md:text-right">
                        <span>{invoice.senderAddress.street}</span>
                        <span>{invoice.senderAddress.city}</span>
                        <span>{invoice.senderAddress.postCode}</span>
                        <span>{invoice.senderAddress.country}</span>
                    </address>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-4">
                    {/* Column 1: Dates */}
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-3">
                            <span className="text-body-m text-content-secondary">Invoice Date</span>
                            <span className="text-h-s text-content-primary">{formatDate(invoice.createdAt)}</span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="text-body-m text-content-secondary">Payment Due</span>
                            <span className="text-h-s text-content-primary">{formatDate(invoice.paymentDue)}</span>
                        </div>
                    </div>

                    {/* Column 2: Bill To */}
                    <div className="flex flex-col gap-3">
                        <span className="text-body-m text-content-secondary">Bill To</span>
                        <span className="text-h-s text-content-primary mb-2 block">{invoice.clientName}</span>
                        <address className="not-italic text-body-m text-content-secondary flex flex-col">
                            <span>{invoice.clientAddress.street}</span>
                            <span>{invoice.clientAddress.city}</span>
                            <span>{invoice.clientAddress.postCode}</span>
                            <span>{invoice.clientAddress.country}</span>
                        </address>
                    </div>

                    {/* Column 3: Sent To (Mobile: Below, Desktop: Column 3) */}
                    <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
                        <span className="text-body-m text-content-secondary">Sent To</span>
                        <span className="text-h-s text-content-primary break-words">{invoice.clientEmail}</span>
                    </div>
                </div>

                {/* Item List Table */}
                <div className="bg-surface-table rounded-t-lg overflow-hidden mt-2">
                    {/* Table Header (Desktop) */}
                    <div className="hidden md:grid grid-cols-[3fr_1fr_2fr_2fr] gap-4 px-8 pt-8 pb-4">
                        <span className="text-body-m text-content-secondary">Item Name</span>
                        <span className="text-body-m text-content-secondary text-center">QTY.</span>
                        <span className="text-body-m text-content-secondary text-right">Price</span>
                        <span className="text-body-m text-content-secondary text-right">Total</span>
                    </div>

                    {/* Table Rows */}
                    <div className="flex flex-col gap-6 md:gap-8 px-6 md:px-8 py-6 md:py-4">
                        {invoice.items.map((item, idx) => (
                            <div key={idx} className="grid grid-cols-2 md:grid-cols-[3fr_1fr_2fr_2fr] gap-2 md:gap-4 items-center">
                                <div className="flex flex-col gap-2 md:gap-0">
                                    <span className="text-h-s-variant text-content-primary">{item.name}</span>
                                    <span className="md:hidden text-body-m text-content-tertiary">
                                        {item.quantity} x £{item.price.toFixed(2)}
                                    </span>
                                </div>
                                <span className="hidden md:block text-h-s-variant text-content-tertiary text-center">{item.quantity}</span>
                                <span className="hidden md:block text-h-s-variant text-content-tertiary text-right">£{item.price.toFixed(2)}</span>
                                <span className="text-h-s-variant text-content-primary text-right">£{item.total.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Grand Total */}
                    <div className="bg-surface-footer p-6 md:px-8 flex items-center justify-between rounded-b-lg transition-colors">
                        <span className="text-body-m text-content-inverted">Amount Due</span>
                        <span className="text-h-m md:text-h-l text-content-inverted">£{invoice.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Mobile Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 md:hidden bg-surface-card p-6 flex justify-end shadow-[0_-10px_20px_rgba(72,84,159,0.1)]">
                <ActionButtons />
            </div>

            {/* Modals & Drawers */}
            <DeleteModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
                onConfirm={handleDelete}
                invoiceId={invoice.id}
            />
            
            <InvoiceForm 
                isOpen={isEditFormOpen} 
                onClose={() => setIsEditFormOpen(false)} 
                invoice={invoice} 
            />
        </section>
    );
};

export default InvoiceDetailPage;
