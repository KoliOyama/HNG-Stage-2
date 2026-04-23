import React, { useState, useRef, useEffect } from 'react';
import { useField } from 'formik';
import { 
    format, 
    addMonths, 
    subMonths, 
    startOfMonth, 
    endOfMonth, 
    startOfWeek, 
    endOfWeek, 
    eachDayOfInterval, 
    isSameMonth, 
    isSameDay,
    parseISO,
    isToday
} from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from '@heroicons/react/24/solid';
import { formatDate } from '@/utils/formatDate';

const DatePicker = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(field.value ? parseISO(field.value) : new Date());
    const containerRef = useRef(null);
    const { setValue } = helpers;

    const hasError = meta.touched && meta.error;
    const selectedDate = field.value ? parseISO(field.value) : null;

    const toggleCalendar = () => {
        if (props.disabled) return;
        setIsOpen(!isOpen);
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handlePrevMonth = (e) => {
        e.stopPropagation();
        setViewDate(subMonths(viewDate, 1));
    };

    const handleNextMonth = (e) => {
        e.stopPropagation();
        setViewDate(addMonths(viewDate, 1));
    };

    const handleDateSelect = (date) => {
        setValue(format(date, 'yyyy-MM-dd'));
        setIsOpen(false);
    };

    // Calendar Grid Logic
    const monthStart = startOfMonth(viewDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
    });

    return (
        <div className="flex flex-col gap-2 w-full relative" ref={containerRef}>
            <label 
                htmlFor={props.id || props.name}
                className={`text-body-m transition-colors ${hasError ? 'text-interactive-danger' : 'text-content-secondary'}`}
            >
                {label}
            </label>

            <button
                type="button"
                onClick={toggleCalendar}
                disabled={props.disabled}
                className={`
                    w-full h-12 px-5 rounded-[4px] border outline-none transition-all font-bold text-h-s-variant text-content-primary bg-input-bg flex items-center justify-between cursor-pointer
                    ${hasError ? 'border-interactive-danger' : 'border-input-border focus:border-interactive-primary'}
                    ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
            >
                <span>{field.value ? formatDate(field.value) : 'Select Date'}</span>
                <CalendarIcon className="w-4 h-4 text-content-tertiary" />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-surface-card rounded-lg shadow-variant z-50 p-6 min-w-[240px]">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <button 
                            type="button"
                            onClick={handlePrevMonth}
                            className="p-2 hover:text-interactive-primary transition-colors"
                        >
                            <ChevronLeftIcon className="w-4 h-4 text-interactive-primary" />
                        </button>
                        <span className="text-h-s-variant text-content-primary font-bold">
                            {format(viewDate, 'MMM yyyy')}
                        </span>
                        <button 
                            type="button"
                            onClick={handleNextMonth}
                            className="p-2 hover:text-interactive-primary transition-colors"
                        >
                            <ChevronRightIcon className="w-4 h-4 text-interactive-primary" />
                        </button>
                    </div>

                    {/* Day Labels */}
                    <div className="grid grid-cols-7 mb-4 justify-items-center">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                            <span key={day} className="text-h-s-variant text-content-primary font-bold opacity-50">
                                {day}
                            </span>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-7 gap-y-4 justify-items-center">
                        {calendarDays.map((day, idx) => {
                            const isSelected = selectedDate && isSameDay(day, selectedDate);
                            const isCurrentMonth = isSameMonth(day, monthStart);
                            
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleDateSelect(day)}
                                    className={`
                                        text-h-s-variant font-bold transition-colors w-full py-1
                                        ${isSelected ? 'text-interactive-primary' : 'text-content-primary'}
                                        ${!isCurrentMonth ? 'opacity-10' : 'hover:text-interactive-primary'}
                                        ${isToday(day) && !isSelected ? 'text-interactive-primary/70' : ''}
                                    `}
                                >
                                    {format(day, 'd')}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {hasError && (
                <span className="text-[10px] font-bold text-interactive-danger absolute -bottom-5 right-0">
                    {meta.error}
                </span>
            )}
        </div>
    );
};

export default DatePicker;
