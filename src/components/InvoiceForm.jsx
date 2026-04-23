import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { TrashIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { invoiceSchema } from '@/utils/validateSchema';
import Drawer from '@/components/Drawer';
import FormField from '@/components/FormField';
import FormSelect from '@/components/FormSelect';
import DatePicker from '@/components/DatePicker';
import Button from '@/components/Button';
import { useInvoices } from '@/context/InvoiceContext';

const InvoiceForm = ({ isOpen, onClose, invoice }) => {
    const isEditMode = !!invoice;
    
    const initialValues = invoice || {
        senderAddress: { street: '', city: '', postCode: '', country: '' },
        clientName: '',
        clientEmail: '',
        clientAddress: { street: '', city: '', postCode: '', country: '' },
        createdAt: new Date().toISOString().split('T')[0],
        paymentTerms: 30,
        description: '',
        items: []
    };

    const paymentOptions = [
        { label: 'Net 1 Day', value: 1 },
        { label: 'Net 7 Days', value: 7 },
        { label: 'Net 14 Days', value: 14 },
        { label: 'Net 30 Days', value: 30 },
    ];

    const { addInvoice, updateInvoice } = useInvoices();
    
    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        if (isEditMode) {
            updateInvoice(invoice.id, values);
        } else {
            addInvoice(values);
        }
        setSubmitting(false);
        resetForm();
        onClose();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={invoiceSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ values, errors, touched, isSubmitting, resetForm }) => {
                const handleClose = () => {
                    resetForm();
                    onClose();
                };

                return (
                <Drawer 
                    isOpen={isOpen} 
                    onClose={handleClose} 
                    title={
                        <div className="flex flex-col gap-6">
                            <button 
                                type="button"
                                onClick={handleClose}
                                className="flex items-center gap-6 md:hidden group"
                            >
                                <ChevronLeftIcon className="w-4 h-4 text-interactive-primary" />
                                <span className="text-h-s-variant text-content-primary group-hover:text-content-secondary transition-colors">
                                    Go back
                                </span>
                            </button>
                            <span>
                                {isEditMode ? (
                                    <>Edit <span className="text-content-secondary">#</span>{invoice.id}</>
                                ) : 'New Invoice'}
                            </span>
                        </div>
                    }
                    footer={
                        <div className={`flex items-center w-full ${isEditMode ? 'justify-end gap-2' : 'justify-between'}`}>
                            <Button 
                                variant="tertiary" 
                                type="button" 
                                onClick={handleClose}
                            >
                                {isEditMode ? 'Cancel' : 'Discard'}
                            </Button>
                            
                            <div className="flex gap-2 md:gap-4">
                                {!isEditMode && (
                                    <Button 
                                        variant="draft" 
                                        type="button"
                                        onClick={() => {
                                            addInvoice(values, true);
                                            handleClose();
                                        }}
                                    >
                                        Save as Draft
                                    </Button>
                                )}
                                <Button 
                                    variant="primary" 
                                    type="submit"
                                    form="invoice-form"
                                    disabled={isSubmitting}
                                >
                                    {isEditMode ? 'Save Changes' : 'Save & Send'}
                                </Button>
                            </div>
                        </div>
                    }
                >
                    <Form id="invoice-form" className="flex flex-col gap-10">
                        {/* Bill From Section */}
                        <fieldset className="flex flex-col gap-12">
                            <legend className="text-h-s-variant text-interactive-primary mb-12">Bill From</legend>
                            <FormField label="Street Address" name="senderAddress.street" />
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                                <FormField label="City" name="senderAddress.city" />
                                <FormField label="Post Code" name="senderAddress.postCode" />
                                <div className="col-span-2 md:col-span-1">
                                    <FormField label="Country" name="senderAddress.country" />
                                </div>
                            </div>
                        </fieldset>

                        {/* Bill To Section */}
                        <fieldset className="flex flex-col gap-12">
                            <legend className="text-h-s-variant text-interactive-primary mb-12">Bill To</legend>
                            <FormField label="Client's Name" name="clientName" />
                            <FormField label="Client's Email" name="clientEmail" placeholder="e.g. email@example.com" />
                            <FormField label="Street Address" name="clientAddress.street" />
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                                <FormField label="City" name="clientAddress.city" />
                                <FormField label="Post Code" name="clientAddress.postCode" />
                                <div className="col-span-2 md:col-span-1">
                                    <FormField label="Country" name="clientAddress.country" />
                                </div>
                            </div>
                        </fieldset>

                        {/* Invoice Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <DatePicker label="Invoice Date" name="createdAt" />
                            <FormSelect label="Payment Terms" name="paymentTerms" options={paymentOptions} />
                        </div>
                        <FormField label="Project Description" name="description" placeholder="e.g. Graphic Design Service" />

                        {/* Item List Section */}
                        <fieldset className="flex flex-col gap-8">
                            <legend className="text-[18px] font-bold text-[#777F98] mb-8">Item List</legend>
                            <FieldArray name="items">
                                {({ push, remove }) => (
                                    <div className="flex flex-col gap-12 md:gap-8">
                                        <div className="hidden md:grid grid-cols-[2.5fr_0.6fr_1fr_0.8fr_0.2fr] gap-8 items-center">
                                            <span className="text-body-m text-content-secondary">Item Name</span>
                                            <span className="text-body-m text-content-secondary">Qty.</span>
                                            <span className="text-body-m text-content-secondary">Price</span>
                                            <span className="text-body-m text-content-secondary">Total</span>
                                            <span></span>
                                        </div>

                                        {values.items.map((item, index) => (
                                            <div key={index} className="grid grid-cols-[64px_100px_1fr_auto] md:grid-cols-[2.5fr_0.6fr_1fr_0.8fr_0.2fr] gap-2 md:gap-8 items-end md:items-center">
                                                <div className="col-span-4 md:col-span-1">
                                                    <FormField label="Item Name" name={`items.${index}.name`} hideLabelOnDesktop />
                                                </div>
                                                <FormField label="Qty." name={`items.${index}.quantity`} type="number" hideLabelOnDesktop px="px-2" />
                                                <FormField label="Price" name={`items.${index}.price`} type="number" hideLabelOnDesktop px="px-4" />
                                                
                                                <div className="flex flex-col gap-4">
                                                    <span className="md:hidden text-body-m text-content-secondary">Total</span>
                                                    <div className="h-12 flex items-center text-h-s-variant text-content-tertiary px-4">
                                                        {(item.quantity * item.price || 0).toFixed(2)}
                                                    </div>
                                                </div>

                                                <button 
                                                    type="button" 
                                                    onClick={() => remove(index)}
                                                    className="h-12 flex items-center justify-center text-content-tertiary hover:text-interactive-danger transition-colors"
                                                >
                                                    <TrashIcon className="w-8 h-8" />
                                                </button>
                                            </div>
                                        ))}

                                        <Button 
                                            variant="secondary" 
                                            type="button" 
                                            className="w-full mt-8"
                                            onClick={() => push({ name: '', quantity: '', price: '', total: 0 })}
                                        >
                                            + Add New Item
                                        </Button>
                                    </div>
                                )}
                            </FieldArray>
                            {typeof errors.items === 'string' && touched.items && (
                                <p className="text-[10px] font-bold text-interactive-danger mt-8">- {errors.items}</p>
                            )}
                        </fieldset>
                    </Form>
                </Drawer>
                );
            }}
        </Formik>
    );
};

export default InvoiceForm;
