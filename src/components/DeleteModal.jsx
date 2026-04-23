import React, { useEffect, useRef } from 'react';
import Button from '@/components/Button';

const DeleteModal = ({ isOpen, onClose, onConfirm, invoiceId }) => {
    const cancelBtnRef = useRef(null);
    const deleteBtnRef = useRef(null);

    // Handle Escape and Focus Trap
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === cancelBtnRef.current) {
                        e.preventDefault();
                        deleteBtnRef.current.focus();
                    }
                } else {
                    if (document.activeElement === deleteBtnRef.current) {
                        e.preventDefault();
                        cancelBtnRef.current.focus();
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        
        // Initial focus on Cancel button
        if (cancelBtnRef.current) {
            cancelBtnRef.current.focus();
        }

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50" 
                onClick={onClose}
                aria-hidden="true"
            />
            
            {/* Modal Content */}
            <div 
                className="relative bg-surface-card rounded-lg p-8 md:p-12 max-w-[480px] w-full"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="delete-modal-title"
                aria-describedby="delete-modal-desc"
            >
                <h2 id="delete-modal-title" className="text-h-m text-content-primary mb-4 md:mb-3">
                    Confirm Deletion
                </h2>
                <p id="delete-modal-desc" className="text-body-m text-content-tertiary mb-6 md:mb-4 leading-relaxed">
                    Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.
                </p>
                
                <div className="flex justify-end gap-2 md:gap-3">
                    <Button 
                        ref={cancelBtnRef}
                        variant="tertiary" 
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button 
                        ref={deleteBtnRef}
                        variant="danger" 
                        onClick={onConfirm}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
