import React from 'react';

const StatusBadge = ({ status }) => {
    // Map the status to the specific modifier class defined in index.css
    const statusClasses = {
        paid: 'status-badge--paid',
        pending: 'status-badge--pending',
        draft: 'status-badge--draft'
    };

    // Map the status to the specific dot color class
    const dotClasses = {
        paid: 'bg-status-paid',
        pending: 'bg-status-pending',
        draft: 'bg-status-draft'
    };

    return (
        <div className={`status-badge ${statusClasses[status] || statusClasses.draft}`}>
            <span className={`status-badge__dot ${dotClasses[status] || dotClasses.draft}`} />
            {status}
        </div>
    );
};

export default StatusBadge;
