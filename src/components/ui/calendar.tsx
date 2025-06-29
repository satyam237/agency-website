"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Mail } from "lucide-react";

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const CalendarDay: React.FC<{ 
  day: number | string; 
  isHeader?: boolean; 
  isToday?: boolean; 
  isSelected?: boolean; 
  isPastDate?: boolean;
  onClick?: () => void; 
}> = ({
  day,
  isHeader,
  isToday,
  isSelected,
  isPastDate,
  onClick,
}) => {
  const getBackgroundColor = () => {
    if (isHeader) return "";
    if (isPastDate) return "text-gray-300 cursor-not-allowed";
    if (isSelected) return "bg-gray-800 text-white";
    if (isToday) return "bg-gray-600 text-white";
    return "text-gray-700 hover:bg-gray-100";
  };

  return (
    <div
      className={`col-span-1 row-span-1 flex h-8 w-8 items-center justify-center ${
        isHeader ? "" : "rounded-xl transition-colors"
      } ${!isHeader && !isPastDate ? "cursor-pointer" : ""} ${getBackgroundColor()}`}
      onClick={!isHeader && !isPastDate ? onClick : undefined}
    >
      <span className={`font-medium ${isHeader ? "text-xs" : "text-sm"}`}>
        {day}
      </span>
    </div>
  );
};

interface CalendarProps {
  onClose: () => void;
  onDateSelect?: (date: Date) => void;
}

export function Calendar({ onClose, onDateSelect }: CalendarProps) {
  const currentDate = new Date();
  const today = currentDate.getDate();
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = new Date(
    currentYear,
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleDateClick = (day: number) => {
    // Don't allow selection of past dates
    if (day < today) return;
    
    setSelectedDate(day);
    const selected = new Date(currentYear, currentDate.getMonth(), day);
    onDateSelect?.(selected);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear error when user starts typing
    if (emailError) {
      setEmailError("");
    }
  };

  const handleBookNow = () => {
    // Validate email first
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!selectedDate) {
      return;
    }

    const selected = new Date(currentYear, currentDate.getMonth(), selectedDate);
    // Here you would typically integrate with a real booking system
    alert(`Booking consultation for ${selected.toLocaleDateString()} with email: ${email}. We'll contact you within 24 hours to confirm the time.`);
    onClose();
  };

  const renderCalendarDays = () => {
    let days: React.ReactNode[] = [
      ...dayNames.map((day, i) => (
        <CalendarDay key={`header-${day}`} day={day} isHeader />
      )),
      ...Array(firstDayOfWeek).map((_, i) => (
        <div
          key={`empty-start-${i}`}
          className="col-span-1 row-span-1 h-8 w-8"
        />
      )),
      ...Array(daysInMonth)
        .fill(null)
        .map((_, i) => {
          const dayNumber = i + 1;
          const isPastDate = dayNumber < today;
          
          return (
            <CalendarDay 
              key={`date-${dayNumber}`} 
              day={dayNumber} 
              isToday={dayNumber === today}
              isSelected={dayNumber === selectedDate}
              isPastDate={isPastDate}
              onClick={() => handleDateClick(dayNumber)}
            />
          );
        }),
    ];

    return days;
  };

  const isBookingEnabled = selectedDate && email.trim() && validateEmail(email);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close calendar"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        <div className="grid gap-6">
          <div>
            <h2 className="mb-4 text-xl md:text-2xl font-semibold text-gray-900">
              Schedule Your Free Consultation
            </h2>
            <p className="mb-4 text-sm md:text-base text-gray-600">
              Select a date and provide your email. We'll contact you to schedule your 30-minute consultation call.
            </p>
          </div>
          
          <div className="transition-all duration-500 ease-out">
            <div className="w-full rounded-2xl border border-gray-200 p-4 transition-colors duration-100">
              <div className="rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-base font-medium text-gray-900">
                    {currentMonth}, {currentYear}
                  </p>
                  <p className="text-sm text-gray-500">30 min call</p>
                </div>
                <div className="grid grid-cols-7 gap-2 px-2">
                  {renderCalendarDays()}
                </div>
              </div>
            </div>
          </div>

          {/* Email Input Section */}
          <div className="space-y-2">
            <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">
              Contact Email *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="email"
                id="contact-email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-sm ${
                  emailError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="add contact email here..."
                aria-describedby={emailError ? 'email-error' : undefined}
                aria-invalid={emailError ? 'true' : 'false'}
              />
            </div>
            {emailError && (
              <div id="email-error" className="flex items-center space-x-1 text-red-600" role="alert">
                <span className="text-sm">{emailError}</span>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleBookNow}
              disabled={!isBookingEnabled}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BentoCardProps {
  children: React.ReactNode;
  height?: string;
  rowSpan?: number;
  colSpan?: number;
  className?: string;
  showHoverGradient?: boolean;
  hideOverflow?: boolean;
  linkTo?: string;
}

export function BentoCard({
  children,
  height = "h-auto",
  rowSpan = 8,
  colSpan = 7,
  className = "",
  showHoverGradient = true,
  hideOverflow = true,
  linkTo,
}: BentoCardProps) {
  const cardContent = (
    <div
      className={`group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 hover:bg-gray-50/50 ${
        hideOverflow && "overflow-hidden"
      } ${height} row-span-${rowSpan} col-span-${colSpan} ${className}`}
    >
      {linkTo && (
        <div className="absolute bottom-4 right-6 z-[999] flex h-12 w-12 rotate-6 items-center justify-center rounded-full bg-white opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-[-8px] group-hover:rotate-0 group-hover:opacity-100">
          <svg
            className="h-6 w-6 text-gray-600"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.25 15.25V6.75H8.75"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 7L6.75 17.25"
            ></path>
          </svg>
        </div>
      )}
      {showHoverGradient && (
        <div className="user-select-none pointer-events-none absolute inset-0 z-30 bg-gradient-to-tl from-gray-400/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></div>
      )}
      {children}
    </div>
  );

  if (linkTo) {
    return (
      <a
        href={linkTo}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}