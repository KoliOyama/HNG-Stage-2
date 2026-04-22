import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { formatDate } from '@/utils/formatDate';
import StatusBadge from '@/components/StatusBadge';

const InvoiceCard = ({ invoice }) => {
    const { id, paymentDue, clientName, total, status } = invoice;

    return (
        <Link
            to={`/${id}`}
            className="flex flex-col md:flex-row md:items-center justify-between bg-surface-card p-3 gap-3 rounded-lg shadow-card border-2 border-transparent hover:border-interactive-primary transition-all duration-200"
        >
            {/* Top row on mobile / Left section on desktop */}
            <div className="flex items-center justify-between md:justify-start md:gap-11">
                <span className="text-h-s-variant text-content-primary">
                    <span className="text-[#7E88C3]">#</span>{id}
                </span>

                <span className="md:hidden text-body-m text-content-secondary">
                    {clientName}
                </span>
            </div>

            {/* Bottom section on mobile / Middle & Right section on desktop */}
            <div className="flex items-center justify-between md:flex-1 md:gap-10">
                <div className="flex flex-col md:flex-row md:items-center md:gap-10">
                    <span className="text-body-m text-content-secondary mb-1 md:mb-0 whitespace-nowrap">
                        Due {formatDate(paymentDue)}
                    </span>

                    <span className="block md:hidden text-h-s-variant text-content-primary whitespace-nowrap">
                        £ {total.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                    </span>

                    <span className="hidden md:block text-body-m text-content-secondary whitespace-nowrap">
                        {clientName}
                    </span>
                </div>

                <div className='flex flex-col md:flex-row md:items-center md:gap-10'>
                    <span className="hidden md:block text-h-s-variant text-content-primary whitespace-nowrap">
                        £ {total.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                    </span>

                    <div className="flex items-center gap-[20px]">
                        <StatusBadge status={status} />
                        <ChevronRightIcon className="hidden md:block w-3 h-3 text-interactive-primary" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default InvoiceCard;
