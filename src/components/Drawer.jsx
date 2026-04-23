import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Drawer = ({ isOpen, onClose, title, children, footer }) => {
    // Prevent scrolling when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    // Handle Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-40 flex">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 transition-opacity duration-500" 
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer Panel */}
            <aside 
                className={`
                    relative bg-surface-drawer shadow-variant transform transition-transform duration-500 ease-in-out flex flex-col
                    w-full h-[calc(100vh-72px)] top-[72px]
                    md:h-[calc(100vh-80px)] md:top-[80px] md:max-w-[616px]
                    lg:h-full lg:top-0 lg:left-[90px] lg:max-w-[719px] lg:rounded-r-[20px]
                `}
                role="dialog"
                aria-modal="true"
            >
                {/* Header */}
                <header className="px-6 md:px-14 py-8 md:py-12 bg-surface-drawer">
                    <h2 className="text-h-m text-content-primary">
                        {title}
                    </h2>
                </header>

                {/* Body - Scrollable */}
                <div className="flex-1 overflow-y-auto px-6 md:px-14 pb-8 custom-scrollbar">
                    {children}
                </div>

                {/* Footer - Fixed at bottom */}
                <footer className="px-4 md:px-14 py-8 md:py-12 bg-surface-drawer shadow-[0_-10px_20px_rgba(72,84,159,0.1)] lg:rounded-br-[20px]">
                    {footer}
                </footer>
            </aside>
        </div>,
        document.body
    );
};

export default Drawer;
