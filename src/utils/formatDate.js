export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Using Intl.DateTimeFormat for "DD MMM YYYY" format
    // Options: day: '2-digit', month: 'short', year: 'numeric'
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).format(date);
};
