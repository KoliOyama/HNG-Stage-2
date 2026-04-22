export const calculateTotal = (items) => {
    if (!items || !Array.isArray(items)) return 0;
    
    return items.reduce((sum, item) => {
        // Calculate each item's total first (qty * price)
        const itemTotal = item.quantity * item.price;
        return sum + itemTotal;
    }, 0);
};
