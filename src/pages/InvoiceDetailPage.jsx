import React from 'react';
import { useParams, Link } from 'react-router-dom';

const InvoiceDetailPage = () => {
    const { id } = useParams();

    return (
        <div>
            <Link to="/" className="text-h-s-variant text-content-primary mb-8 inline-block hover:text-content-secondary transition-colors">
                Go back
            </Link>
            <h1 className="text-h-l text-content-primary">Invoice {id}</h1>
            {/* Invoice details will go here */}
        </div>
    );
};

export default InvoiceDetailPage;
