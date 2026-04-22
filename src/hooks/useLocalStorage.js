import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
    // 1. Initialize state with value from localStorage or initialValue
    const [value, setValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            // If item exists, parse it; otherwise return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // 2. Sync state to localStorage whenever 'value' or 'key' changes
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, value]);

    return [value, setValue];
};
